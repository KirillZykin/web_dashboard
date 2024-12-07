from pydantic import BaseModel, Field
from typing import List, Optional
# Схемы данных
class StudentBase(BaseModel):
    last_name: str
    first_name: str
    middle_name: str
    course: int
    group: str
    faculty: str

class StudentResponse(StudentBase):
    id: int

    class Config:
        orm_mode = True