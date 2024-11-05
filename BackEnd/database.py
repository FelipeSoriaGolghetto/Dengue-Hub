import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        dbname='db_grupo06',
        user='u_grupo06',
        password='grupo06',
        host='200.144.245.12',
        port='65432'
    )
    return conn
