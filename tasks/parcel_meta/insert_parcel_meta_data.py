import psycopg2
import database_config

def insertData(cursor):
    with open('parcel_meta_data.csv', 'r') as f:
        cursor.copy_from(f, 'parcel.parcel_meta', sep= ',')
    print('Data Inserted')
def main():
    print('Connecting to the PostgreSQL database...')
    connection = psycopg2.connect(host=database_config.DATABASE_CONFIG['host'], database=database_config.DATABASE_CONFIG['dbname'], user=database_config.DATABASE_CONFIG['user'], password=database_config.DATABASE_CONFIG['password'])
    cursor = connection.cursor()

    insertData(cursor)
    connection.commit()

    cursor.close()
    connection.close()
# END main

if __name__ == "__main__":
    main()