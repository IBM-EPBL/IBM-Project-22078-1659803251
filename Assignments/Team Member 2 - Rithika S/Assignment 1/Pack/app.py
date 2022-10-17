from flask import Flask

from datetime import datetime
import pytz
from color_convert import color
import numpy as np
import pandas as pd

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route("/", methods=["GET"])
def register():
    # DateTime & pytz
    print('----------------------------')
    time = datetime.now(tz=pytz.timezone('Asia/Kolkata'))
    print(time)

    # color_convert
    print('----------------------------')
    rgbValue = color.hex_to_rgb("#fff000")
    print(rgbValue)

    # Numpy
    print('----------------------------')
    a = [(1, 2), [3, 4, (5)], (6, 7, 8)]
    b = np.array(a, dtype=object)
    print(b)

    # Pandas
    print('----------------------------')
    dates = pd.date_range("20130101", periods=6)
    print(dates)

    return 'Packages used<br/>Pandas Numpy DateTime PYTZ Color_Convert'


if __name__ == '__main__':
    app.run()
