from fastapi import APIRouter, HTTPException
from app.settings import settings
from fastapi.responses import JSONResponse
from app.schemas import BankRequest, CuentaRequest
from datetime import datetime
import httpx

auth = (settings.BELVO_CLIENT_ID, settings.BELVO_CLIENT_SECRET)

router = APIRouter()
@router.get('/instituciones')
async def obtener_instituciones():
    url = f"{settings.BELVO_BASE_URL}/api/institutions"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, auth=auth)

    if response.status_code == 200:
        data = response.json()
        instituciones = data.get("results", [])

        bancos = [
            {
                "id": institucion["id"],
                "name": institucion["name"],
                "display_name": institucion["display_name"],
                "country_code": institucion["country_code"],
                "icon_logo": institucion["icon_logo"],
            }
            for institucion in instituciones
            if institucion.get("type") == "bank" 
        ]
        
        return JSONResponse(content={"bancos": bancos}, status_code=200)
    return JSONResponse(content={"error": "No se pudo obtener las instituciones"}, status_code=response.status_code)

@router.post("/cuentas-banco")
async def get_bank_link(bank_request: BankRequest):
    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            f"{settings.BELVO_BASE_URL}/api/links/",
            json={
                "institution": bank_request.institucion,
                "username": "bnk100"
            }
        , auth=auth)

        if response.status_code != 201:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch link")
    
        link_data = response.json()
        if "id" not in link_data:
            raise HTTPException(status_code=404, detail="ID not found in response")

        account_response = await client.post(
            f"{settings.BELVO_BASE_URL}/api/accounts/",
            json={
                "link": link_data["id"],
            },
            auth=auth
        )

        if account_response.status_code != 201:
            raise HTTPException(status_code=account_response.status_code, detail="Failed to fetch accounts")

        account_data = account_response.json()

        formatted_accounts = [
            {
                "id": account["id"],
                "link": account["link"],
                "type": account["type"],
                "public_identification_name": account.get("public_identification_name", ""),
                "public_identification_value": account.get("public_identification_value", ""),
                "name": account["name"]
            }
            for account in account_data
        ]

    return {"accounts": formatted_accounts}


@router.post("/transacciones-cuenta")
async def get_transacciones_cuenta(cuenta_request: CuentaRequest):
    async with httpx.AsyncClient(timeout=12.0) as client:
        response = await client.get(
            f"{settings.BELVO_BASE_URL}/api/transactions/?link={cuenta_request.link}&account={cuenta_request.id}", auth=auth)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to fetch account")

        data = response.json()
        transacciones = data.get("results", [])
        formatted_transacciones = [
            {
                "id": transaccion["id"],
                "category": transaccion["category"],
                "type": transaccion["type"],
                "status": transaccion["status"],
                "balance": transaccion["balance"],
                "amount": transaccion["amount"],
                "value_date": transaccion["value_date"],
                
            }
            for transaccion in transacciones
        ]

    sorted_transacciones = sorted(
        formatted_transacciones, 
        key=lambda x: datetime.strptime(x["value_date"], "%Y-%m-%d"), 
        reverse=True
    )
    ingreso = round(sum(t["amount"] for t in formatted_transacciones if t["type"] == "INFLOW"),2)
    egreso = round(sum(t["amount"] for t in formatted_transacciones if t["type"] == "OUTFLOW"),2)
    balance = round(ingreso - egreso, 2)

    return {
        "transacciones": sorted_transacciones,
        "ingreso": ingreso,
        "egreso": egreso,
        "balance": balance
    }