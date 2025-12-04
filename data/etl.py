import pandas as pd
import json

# 1. Leitura do arquivo CSV
df = pd.read_csv('data/raw/ecomm_transactions.csv')

# 2. Renomeia a coluna 'OrderDate' para 'created_at'
df = df.rename(columns={'OrderDate': 'created_at'})

# 3. Converte a coluna 'created_at' para o formato datetime
df['created_at'] = pd.to_datetime(df['created_at'])

# 4. Cria uma coluna com a data no formato 'YYYY-MM-DD'
df['date_string'] = df['created_at'].dt.strftime('%Y-%m-%d')

# 5. Agrupa os dados pela coluna 'date_string' e conta o número de tickets por dia
daily_count = df.groupby('date_string').size().reset_index(name='count')

# 6. Renomeia a coluna 'date_string' para 'date'
daily_count = daily_count.rename(columns={'date_string': 'date'})

# 7. Converte para formato de dicionário
tickets_by_day = daily_count.to_dict('records')

# 8. Lista as categorias mais frequentes
top_categories = df['Category'].value_counts().head(5) # Top 5
top_categories_dict = top_categories.to_dict()

# 9. Lista as marcas mais frequentes
top_brands = df['Brand'].value_counts().head(5)
top_brands_dict = top_brands.to_dict()

# 10. Lista os produtos mais vendidos
top_products = df['ProductName'].value_counts().head(5)
top_products_dict = top_products.to_dict()

# 10. Conta o número total de tickets
total_tickets = df.shape[0]

# 11. Cria um dicionário com as métricas
metrics_data = {
    "total_tickets": total_tickets,
    "tickets_by_day": tickets_by_day,
    "top_categories": top_categories_dict,
    "top_brands": top_brands_dict,
    "top_products": top_products_dict
}

# 12. Salva as métricas em /data/processed/metrics.json
output_path = 'data/processed/metrics.json'
with open(output_path, 'w') as f:
    json.dump(metrics_data, f, indent=4)

print(f"Métricas geradas com sucesso e salvas em: {output_path}")