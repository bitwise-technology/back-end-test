import email
from typing import List

from fastapi import APIRouter
from fastapi import status
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Response

from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from models.user_model import UserModel
from core.deps import get_session

#Bypass worning SQLModel select
from sqlmodel.sql.expression import Select, SelectOfScalar

SelectOfScalar.inherit_cache = True # type: ignore
Select.inherit_cache = True # type: ignore
# End Bypass

router = APIRouter()

# POST USER
@router.post('/', status_code=status.HTTP_201_CREATED, response_model=UserModel)
async def post_user(user: UserModel, db: AsyncSession = Depends(get_session)):
    new_user = UserModel(
        userName=user.userName,
        email=user.email,
        name=user.name,    
        lastName=user.lastName,
        profileImageUrl=user.profileImageUrl,
        bio=user.bio,    
        gender=user.gender
    )

    db.add(new_user)
    await db.commit()

    return new_user

# GET USER
@router.get('/{user_id}', response_model=UserModel, status_code=status.HTTP_200_OK)
async def get_user(user_id: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(UserModel).filter(UserModel.id == user_id)
        result = await session.execute(query)
        user: UserModel = result.scalar_one_or_none()

        if user:
            return user
        else:
            raise HTTPException(detail='User not found', status_code=status.HTTP_404_NOT_FOUND)

# PUT USER
@router.put('/{user_id}', response_model=UserModel, status_code=status.HTTP_202_ACCEPTED)
async def put_user(user_id: int, user: UserModel, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(UserModel).filter(UserModel.id == user_id)
        result = await session.execute(query)
        user_up: UserModel = result.scalar_one_or_none()

        if user_up:
            user_up.userName=user.userName
            user_up.email=user.email
            user_up.name=user.name    
            user_up.lastName=user.lastName
            user_up.profileImageUrl=user.profileImageUrl
            user_up.bio=user.bio  
            user_up.gender=user.gender

            await session.commit()
            
            return user_up
        else:
            raise HTTPException(detail='User not found', status_code=status.HTTP_404_NOT_FOUND)