import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

FE_URL = os.getenv("FE_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FE_URL],
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, DELETE 등 모두 허용
    allow_headers=["*"],
)


# ── 주고받을 데이터의 모양 (Pydantic) ──
class MemoIn(BaseModel):  # 요청 본문: 클라이언트가 보내는 데이터
    content: str


class MemoOut(BaseModel):  # 응답 본문: 서버가 돌려주는 데이터
    id: int
    content: str


# ── 인메모리 저장소 (리스트에 저장 → 서버 끄면 사라짐) ──
memos: list[dict] = []
next_id = 1


@app.get("/memos", response_model=list[MemoOut])
def list_memos():
    return memos


@app.post("/memos", response_model=MemoOut)
def create_memo(memo: MemoIn):
    global next_id
    new = {"id": next_id, "content": memo.content}
    memos.append(new)
    next_id += 1
    return new


@app.delete("/memos/{memo_id}")
def delete_memo(memo_id: int):
    global memos
    for m in memos:
        if m["id"] == memo_id:
            memos = [x for x in memos if x["id"] != memo_id]
            return {"ok": True}
    raise HTTPException(status_code=404, detail="Memo not found")
