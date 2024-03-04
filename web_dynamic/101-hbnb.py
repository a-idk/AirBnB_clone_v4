#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask
from flask import render_template
from flask import url_for
from models import storage
import uuid

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


@app.teardown_appcontext
def teardown_db(exception):
    """
    Method that closes an SQLAlchemy session
    """
    storage.close()


@app.route('/101-hbnb', strict_slashes=False)
def hbnb_values(the_id=None):
    """
    Method that handles req to states, cities, amenities
    """
    all_state = storage.all('State').values()
    states = dict([st.name, st] for st in all_state)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, f"{user.first_name} {user.last_name}"]
                 for user in storage.all('User').values())
    return render_template(
            '1-hbnb.html', cache_id=uuid.uuid4(),
            states=states, amens=amens, places=places, users=users
            )


if __name__ == "__main__":
    """ call from MAIN """
    app.run(host=host, port=port)
