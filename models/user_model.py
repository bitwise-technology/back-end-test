from typing import Optional
from sqlmodel import Field, SQLModel

class UserModel(SQLModel, table=True):
    __tablename__: str = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    userName: str
    email: str
    name: str    
    lastName: Optional[str]
    profileImageUrl: Optional[str]
    bio: Optional[str]    
    gender: Optional[str]