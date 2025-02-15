from pydantic import BaseModel

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str
    nombre: str
    apellido: str
    telefono: str
    direccion: str

class UserLogin(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        from_attributes = True

class BankRequest(BaseModel):
    institucion: str

class CuentaRequest(BaseModel):
    id: str
    link: str