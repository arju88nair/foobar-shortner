from flask import (
    Flask,
    render_template,
    request,
    json
)
from monsterurl import get_monster
from flask_pymongo import PyMongo
import re
from bson.json_util import dumps
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Foobar"
mongo = PyMongo(app)
mongo = mongo.db.urls

# Create the application instance
app = Flask(__name__, template_folder="templates")
CORS(app)


"""[THe main route for creating the shortened url]

Returns:
    [json] -- [Success with the generated URL]
"""

# Create a URL route in our application for "/"
@app.route('/', methods=['GET', 'POST'])
def doFooBar():
    url=request.args.get('url')
    if(url is None):
        return json.dumps({'success':False,'message':"Empty URL"}), 400, {'ContentType':'application/json'} 
    short=get_monster()
    
    if(urlValidate(url) is None):
        return json.dumps({'success':False,'message':"Not a proper url"}), 400, {'ContentType':'application/json'} 
    else:
        if(request.args.get('slug')):
            short=request.args.get('slug')
        if mongo.count_documents({ 'short': short }, limit = 1) != 0:     
            return json.dumps({'success':False,'message':"Already taken"}), 400, {'ContentType':'application/json'}      
        insertURL(url,short)
        return json.dumps({'success':True,'url':short,'message':"Success"}), 200, {'ContentType':'application/json'} 
    
   


"""[Validating URL]

Returns:
    [Boolean] -- [if the string is url or not]
"""

def urlValidate(url):
    regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)
    return re.match(regex, url)


"""[insertion to the collection]

Returns:
    [type] -- [description]
"""

def insertURL(url,short):
    _id = mongo.insert_one({"url": url,"short":short})
    return _id


# If we're running in stand alone mode, run the application
if __name__ == '__main__':
    app.run(debug=True)