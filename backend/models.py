# Importações do SQLAlchemy para trabalhar com banco de dados
from sqlalchemy import create_engine, Column, Integer, String, DateTime
import sqlalchemy
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timezone
import os

# Define o caminho do arquivo do banco de dados SQLite
DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite")
# String de conexão para o SQLite: sqlite:///caminho/para/banco.db
SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

# Cria o engine (motor) de conexão com o banco de dados
# check_same_thread=False é necessário para SQLite em FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Cria a Sessão para interagir com o banco de dados
# autocommit=False: não commita automaticamente as transações
# autoflush=False: não envia automaticamente mudanças para o banco antes de queries
# bind=engine: vincula as sessões ao engine criado acima
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria a classe base para todos os modelos ORM
Base = sqlalchemy.orm.declarative_base()

# Define o modelo da tabela tickets
class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    # lambda: garante que a função seja executada no momento da inserção
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    # string indexada para buscas mais rápidas
    customer_name = Column(String, index=True)
    channel = Column(String)
    subject = Column(String)
    # status do ticket padrão é open
    status = Column(String, default="open")
    # prioridade do ticket padrão é low
    priority = Column(String, default="low")

    # Método para representação legível do objeto Ticket
    def __repr__(self):
        return f"<Ticket(id={self.id}, subject='{self.subject}', status='{self.status}', priority='{self.priority}')>"

# Função para criar as tabelas no banco de dados
def create_tables():
    """Cria o arquivo db.sqlite e as tabelas definidas no Base."""
    Base.metadata.create_all(bind=engine)

# Bloco executado apenas quando o script é rodado diretamente
if __name__ == '__main__':
    create_tables()
    print(f"Tabela 'tickets' e arquivo db.sqlite criados em: {DB_PATH}")