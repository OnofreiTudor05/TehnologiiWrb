import pandas as pd
from flask import Flask, render_template, jsonify


def preprocess_csv_sales(file_path='resources/sales.csv'):
    check_values = {'POSTAL_CODE': '000000',
                    'TERRITORY': 'Not Available',
                    'STATE': 'Not Available',
                    'ADDRESS_LINE_2': 'Not Known'
                    }
    try:
        dataframe = pd.read_csv(file_path)
        dataframe.fillna(check_values, inplace=True)
        return dataframe
    except Exception as e:
        print(e)


app = Flask(__name__, template_folder="./pages")


@app.route('/sales', methods=['GET'])
def get_csv_sales():
    try:
        dataframe = preprocess_csv_sales()
        json_data = dataframe.to_dict(orient='records')
        return jsonify(json_data)
    except Exception as e:
        print(e)


@app.route('/plot', methods=['GET'])
def get_cumulative_sales_per_month():
    try:
        dataframe = preprocess_csv_sales()
        dataframe = dataframe[['SALES', 'ORDER_DATE']]
        dataframe['ORDER_DATE'] = pd.to_datetime(dataframe['ORDER_DATE'])

        dataframe['MONTH'] = dataframe['ORDER_DATE'].dt.to_period('M')

        dataframe = dataframe[['MONTH', 'SALES']]
        grouped_dataframe = dataframe.groupby(['MONTH']).agg({
            'SALES': 'sum'})
        grouped = grouped_dataframe.rename(columns={
            'SALES': 'TOTAL_SALES'})
        grouped = grouped.reset_index()
        grouped['MONTH'] = grouped['MONTH'].apply(lambda x: x.to_timestamp().strftime(format='%Y-%m'))
        grouped['CUMULATIVE_SALES'] = grouped['TOTAL_SALES'].cumsum()

        json_data = grouped[['MONTH', 'CUMULATIVE_SALES']].to_dict(orient='records')
        return jsonify(json_data)
    except Exception as e:
        print(e)


@app.route('/bar1', methods=['GET'])
def get_sales_per_territory_monthly():
    try:
        dataframe = preprocess_csv_sales()
        dataframe = dataframe[['SALES', 'ORDER_DATE', 'TERRITORY']]
        dataframe['ORDER_DATE'] = pd.to_datetime(dataframe['ORDER_DATE'])

        dataframe['MONTH'] = dataframe['ORDER_DATE'].dt.to_period('M')

        dataframe = dataframe[['MONTH', 'SALES', 'TERRITORY']]
        grouped_dataframe = dataframe.groupby(['MONTH', 'TERRITORY']).agg({
            'SALES': 'sum'})

        grouped = grouped_dataframe
        grouped = grouped.reset_index()
        grouped['MONTH'] = grouped['MONTH'].apply(lambda x: x.to_timestamp().strftime(format='%Y-%m'))
        data = {}
        for _, row in grouped.iterrows():
            territory = row['TERRITORY']
            month = row['MONTH']
            sales = row['SALES']

            if territory not in data:
                data[territory] = []

            data[territory].append((month, sales))
        return jsonify(data)
    except Exception as e:
        print(e)


@app.route('/bar2', methods=['GET'])
def get_sales_per_territory_yearly():
    try:
        dataframe = preprocess_csv_sales()
        dataframe = dataframe[['SALES', 'ORDER_DATE', 'TERRITORY']]
        dataframe['ORDER_DATE'] = pd.to_datetime(dataframe['ORDER_DATE'])

        dataframe['MONTH'] = dataframe['ORDER_DATE'].dt.to_period('Y')

        dataframe = dataframe[['MONTH', 'SALES', 'TERRITORY']]
        grouped_dataframe = dataframe.groupby(['MONTH', 'TERRITORY']).agg({
            'SALES': 'sum'})
        grouped = grouped_dataframe
        grouped = grouped.reset_index()
        grouped['MONTH'] = grouped['MONTH'].apply(lambda x: x.to_timestamp().strftime(format='%Y'))
        data = {}
        for _, row in grouped.iterrows():
            territory = row['TERRITORY']
            month = row['MONTH']
            sales = row['SALES']

            if territory not in data:
                data[territory] = []

            data[territory].append((month, sales))
        return jsonify(data)
    except Exception as e:
        print(e)


@app.route('/pie1', methods=['GET'])
def get_sales_per_deal_size():
    try:
        dataframe = preprocess_csv_sales()
        dataframe = dataframe[['SALES', 'DEAL_SIZE']]
        grouped_dataframe = dataframe.groupby(['DEAL_SIZE']).agg({
            'SALES': 'sum'})
        grouped_dataframe = grouped_dataframe.reset_index()
        json_data = grouped_dataframe.to_dict(orient='records')
        return jsonify(json_data)
    except Exception as e:
        print(e)


@app.route('/pie2', methods=['GET'])
def get_surcharge_discount_per_deal_size():
    try:
        dataframe = preprocess_csv_sales()
        dataframe = dataframe[dataframe['MSRP'] != dataframe['UNIT_PRICE']]
        dataframe = dataframe[['SALES', 'DEAL_SIZE']]
        grouped_dataframe = dataframe.groupby(['DEAL_SIZE']).agg({
            'SALES': 'sum'})
        grouped_dataframe = grouped_dataframe.reset_index()
        json_data = grouped_dataframe.to_dict(orient='records')
        return jsonify(json_data)
    except Exception as e:
        print(e)


@app.route('/')
def index():
    return render_template('/views/index.html')


@app.route('/task1')
def render_datatable():
    return render_template('/views/task1.html')


@app.route('/task2')
def render_cumulative_sales_per_month():
    return render_template('/views/task2.html')


@app.route('/task3')
def render_monthly_total_sales_per_territory():
    return render_template('/views/task3.html')


@app.route('/task4')
def render_sales_per_deal_size():
    return render_template('/views/task4.html')


if __name__ == "__main__":
    app.run(debug=True)
