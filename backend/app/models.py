from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    nombre = Column(String, nullable=True)
    apellido = Column(String, nullable=True)
    telefono = Column(String)
    direccion = Column(String, nullable=True)
    password_hash = Column(String)
