from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from typing import List

from database import Student, get_db, Base, engine
from orm import StudentBase, StudentResponse

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Эндпоинт для получения списка студентов с пагинацией
@app.get("/students", response_model=List[StudentResponse])
def get_students(
        db: Session = Depends(get_db),
        skip: int = Query(0, ge=0, description="Сколько записей пропустить"),
        limit: int = Query(10, ge=1, le=100, description="Сколько записей вернуть")
):
    students = db.query(Student).offset(skip).limit(limit).all()
    return students

# Заполнение тестовыми данными (опционально)
@app.post("/students/populate")
def populate_students(db: Session = Depends(get_db)):
    test_data = [
        Student(
            last_name=f"Фамилия{i}",
            first_name=f"Имя{i}",
            middle_name=f"Отчество{i}",
            course=(i % 4) + 1,
            group=f"Группа-{(i % 5) + 1}",
            faculty=f"Факультет-{(i % 3) + 1}",
        )
        for i in range(40)
    ]
    db.bulk_save_objects(test_data)
    db.commit()
    return {"message": "Тестовые данные добавлены"}
