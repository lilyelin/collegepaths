# Imports
import csv

from pandas import Series
from matplotlib import pyplot

newlist = []
class myClass:
    name = ""
    age = 0
    hobbies = []
    def __init__(self, var1, var2):
        self.name = var1
        self.age = var2
       # self.hobbies = var3

# parse script
with open('test2a.csv', 'r') as f:
	reader = csv.reader(f)
	for row in reader:
		print(row)
		newlist.append(row[0])

# to create table nav code
## because still better than hard coding?

# filename = 'careernav1.csv'
filename = 'careernav2.csv'
red_rgba = 'rgba(200, 54, 54, ', # 0.5)
rgba_color = 'rgba(45, 70, 112, '

cond={
	'name':{
		'pos':1,
		'hide':False,
		'color':False,
		# 'style':'background-color:rgb(200, 54, 54)'
		'style':'',
		'tooltip':False,
		'multiplier':False
	},
	# 'gpa':{
	# 	'pos':7,
	# 	'hide':False,
	# 	'color':False,
	# 	# 'style':'background-color:rgb(200, 54, 54)'
	# 	'style':''
	# },
	'gpa':{
		'pos':7,
		'hide':True,
		'color':True,
		'style':'background-color:red',
		# background: rgb(200, 54, 54); /* The Fallback */
   # background: rgba(200, 54, 54, 0.5); 
		'bgcolor':rgba_color,
		'divisor':4.0,
		'adjust':-2,
		'multiplier':100,
		'tooltip':True
	},
	'flexibility':{
		'pos':8,
		'hide':True,
		'color':True,
		'style':'background-color:red',
		'bgcolor':rgba_color,
		'divisor':0.9,
		'adjust':0,
		'multiplier':100,
		'tooltip':True
	},
	'college':{
		'pos':0,
		'hide':True,
		'color':True,
		'style':'background-color:red',
		'bgcolor':'pink',
		'divisor':1.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':True
	},
	'graduated':{
		'pos':2,
		'hide':False,
		'color':False,
		'style':'background-color:red',
		'bgcolor':'pink',
		'divisor':1.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':False
	},
	'employed':{
		'pos':3,
		'hide':False,
		'color':True,
		'style':'background-color:red',
		'bgcolor':'pink',
		'divisor':1.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':False
	},
	'grad':{
		'pos':4,
		'hide':False,
		'color':False,
		'style':'background-color:red',
		'bgcolor':'pink',
		'divisor':1.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':False
	},
	'seeking':{
		'pos':5,
		'hide':False,
		'color':False,
		'style':'background-color:red',
		'bgcolor':'pink',
		'divisor':1.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':False
	},
	'salary':{
		'pos':6,
		'hide':True,
		'color':True,
		'style':'background-color:red',
		'bgcolor':rgba_color,
		'divisor':109078.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':True
	},
	'advising':{
		'pos':9,
		'hide':True,
		'color':True,
		'style':'background-color:red',
		'bgcolor':'pink',
		'divisor':1.0,
		'adjust':0,
		'multiplier':False,
		'tooltip':True
	},
}
set_colors={
	'college':{
		'L&S':'red',
		'Haas':'orange',
		'College of Chemistry':'yellow',
		'College of Engineering':'blue',
		'College of Natural Resources':'green'
	},
	'advising':{
		'L&S Social Sciences Division':'gray',
		'L&S Undergrad Studies Division':'gray',
		'L&S Math & Phys Sciences Div':'gray',
		'L&S Arts & Humanities Division':'gray',
		'L&S Administered Programs':'gray',
		'L&S Biological Sciences Div':'gray',
		'Haas School of Business':'gray',
		'Clg of Chemistry':'gray',
		'Clg of Engineering':'gray',
	}
}

donotlook_majors = ['African American Studies','Anthropology','Applied Mathematics','Astrophysics','Comparative Literature', 'Economics','English','Geography','History','Interdisciplinary Studies','Linguistics','Molecular and Cell Biology','Mass Communications & Media','Mathematics','Philosophy','Physics','Political Science','Psychology','Public Health','Rhetoric','Sociology','Statistics','Chemical Engineering','Mechanical Engineering','Nuclear Engineering','Architecture','Environmental Science','Forestry & Natural Resources','Molecular Environmental Biology']
tooshort_majors = ['Asian Studies','Celtic Studies','Chinese',"Gender & Women's Studies",'German','Japanese Language','Middle Eastern Studies','Religious Studies','Scandinavian','Slavic Language & Literature','South & South Asian Studies','Forestry & Natural Resources','Nutritional Sciences']
avoidmajors = donotlook_majors + tooshort_majors

html = ""
# options=['gpa','salary','employed','grad','flexibility','advising','college','name']

options=['flexibility','salary','gpa','name']
# null_color = 'lightgray'
null_color = '#F8F9FC'
master_colors=[]
rainbow_colors = []
#<td onClick="document.location.href='http://www.yoursite.com';"> some text here </td>

html = ""
with open(filename, 'r') as f:
	reader = csv.reader(f)
	iterreader = iter(reader)
	next(iterreader)
	for row in iterreader:
		html+="<tr>"
		for opts in options:
			current_value = row[cond[opts]['pos']]
			html+="<td class='"+opts
			#tooltip beginning
			if cond[opts]['tooltip']==True:
				html+= " CellWithComment"
			html+="' style='" 
			# background color
			if cond[opts]['color']:
				html+='background-color:'
				if current_value == 'NA':
					html += null_color
				elif opts =='college':
					html += set_colors[opts][current_value]
				elif opts =='advising':
					html += set_colors[opts][current_value]
				else:
					adjust = cond[opts]['adjust']
					html+=cond[opts]['bgcolor']
					html+=str((float(current_value)+adjust)/(cond[opts]['divisor']+adjust))
					html+=")"
			else:
				html+=cond[opts]['style']
			html+="'>"
			# set value
			if cond[opts]['multiplier'] != False and current_value != 'NA':
				# create use value for sorting
				use_value = str(float(current_value)*cond[opts]['multiplier'])
				# print(use_value)
			else:
				use_value = current_value
			# display text for sorting purposes
			if use_value =='NA':
				display_value = '0';
			else:
				display_value = use_value
			if cond[opts]['hide']:
				html+="<div class='hide'>"
				html+=display_value 
				# add * if belong to avoidmajors list
				if use_value in avoidmajors:
					html+="*"
				html+= "</div>"
				html+="<span class='CellComment'>" + current_value
				html+="</span>"
			elif cond[opts]['tooltip']==True:
				html+="<div class='tooltip'>"
				html+=display_value 
				# add * if belong to avoidmajors list
				if use_value in avoidmajors:
					html+="*"
				html+= "</div>"
				html+="<span class='CellComment'>" + current_value
				html+="</span>"
			# elif opts=='name':
			# 	# for major name we include link
			# 	html+="<a href='#'>" + use_value + "</a>"
			else:
				html+=display_value
				# add * if belong to avoidmajors list
				if use_value in avoidmajors:
					html+="*"
			# if cond[opts]['tooltip']==True:
			# 	html+="<span class='tooltiptext'>" + current_value
			# 	html+="</span>"
			html+="</td>"
		html+="</tr>"

# 
# 
# 
# JSON PARSER
# 
# 

# JSON PARSER EXAMPLE
import json

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)


# Example
data = {}
data['key'] = 'value'
extension = './sankeydata/'

writeToJSONFile('./','file-name',data)
# './' represents the current directory so the directory save-file.py is in
# 'test' is my file name

# SANKEY HELPER
# make the url name from Major Name
def makeURLName(name):
	name_url = name.lower().replace(' ','-')
	end_url = '-sankey'
	return name_url+end_url

# for all active majors write data file
def writeSankeyJSONS():
	itermajors = getUniqueList(majorslist)
	for major in itermajors:
		currentdata = allsankeys[major]
		extension = './sankeydata/'
		writefilename = makeURLName(major)
		writeToJSONFile(extension,writefilename,currentdata)

def writeMasterSankeyJSON():
	extension = './sankeydata/'
	data = allsankeys
	writeToJSONFile(extension, 'mastersankey', data)

# write to a json file given filename and data
def writeJSON(filename, data):
	writeToJSONFile(extension,filename,data)

# TRACKER LIST
# add to tracker
def addToTracker(major, node_name):
	if getPosTracker(major, node_name) != None:
		return False
	elif major in tracker:
		track_obj = tracker[major]
		track_obj['count'] += 1
		track_obj[node_name] = track_obj['count']
	else:
		track_obj = {
			'count':0,
			node_name: 0
		}
		tracker[major] = track_obj
	return True

# get position from tracker
def getPosTracker(major, node_name):
	if major in tracker:
		track_obj = tracker[major]
		if node_name in track_obj:
			return track_obj[node_name]
	else:
		return None

# NODE LIST
# add to node list for major
def addToNodes(major, node_name, val):
	if node_name == "Other":
		val="gray"
	if major in nodeslist:
		nodes = nodeslist[major]
		if node_name in nodes:
			return False
		else:
			nodeslist[major][node_name] = val
			addToTracker(major, node_name)
	else:
		nodeslist[major]={node_name:val}
		addToTracker(major, node_name)


# RELATIONS LIST
def addIndustryRelations(major, employer, title, count):
	# first add nodes if not already there
	value = "blue"
	addToNodes(major, major, "firstlayer")
	addToNodes(major, "Industry", value)
	addToNodes(major, employer, value)
	addToNodes(major, title, value)
	addRelation(major,major, "Industry", count)
	addRelation(major,"Industry", employer, count)
	addRelation(major,employer, title, count)

def addGradRelations(major, school, typegrad, field, count):
	# first add nodes if not already there
	gradterm = "Graduate School"
	# gradterm = "Further Education"
	value = "orange"
	addToNodes(major, major, "firstlayer")
	addToNodes(major, gradterm, value)
	addToNodes(major, school, value)
	addToNodes(major, typegrad, value)
	addToNodes(major, field, value)
	addRelation(major,major, gradterm, count)
	addRelation(major,gradterm, school, count)
	addRelation(major,school, typegrad, count)
	addRelation(major,typegrad, field, count)

# add relationship between two nodes
def addRelation(major, source, target, count):
	if major in relations:
		currentrelations = relations[major]
		if source in currentrelations:
			# if source+target cell already exists
			# so increase value
			if target in currentrelations[source]:
				currentrelations[source][target]+=count
			# if source exists, but not target
			else:
				currentrelations[source][target]= count
		else:
			relations[major][source] = {}
			relations[major][source][target] = count
		# if source not in relations
	else:
		relations[major] = {}
		relations[major][source]={}
		relations[major][source][target] = count

# make links from relations
# use position and iterate through relations
# divide value by something
# for each major make the ultimate sankey info!
def makeSankeyNodes(major):
	# do stuff
	newlist = []
	currentlist = nodeslist[major]
	for name in currentlist:
		obj = {
			"name":name,
			"id":currentlist[name]
		}
		newlist.append(obj)
	return newlist

def convertLinkValue(value):
	max_value = 6
	multiplier = 0.5
	if value >= max_value:
		new_value = multiplier * max_value
	else:
		new_value = multiplier * value
	return new_value

def makeSankeyLinks(major):
	# do stuff
	newlist = []
	currentlist = relations[major]
	for source in currentlist:
		for target in currentlist[source]:
			obj = {
				"source":getPosTracker(major, source),
				"target":getPosTracker(major, target),
				"value":convertLinkValue(float(currentlist[source][target]))
			}
			newlist.append(obj)
	return newlist

#### Make many sankeys
def makeSankeyJSON():
	itermajors = getUniqueList(majorslist)
	for major in itermajors:
		current={
			"nodes": makeSankeyNodes(major),
			"links": makeSankeyLinks(major)
		}
		allsankeys[major] = current
	return current



def getUniqueList(thelist):
	return list(set(thelist))

# MAKE LINKS

# make object
tracker={}
nodeslist={}
relations = {}
allsankeys = {}
majorslist = []

# current test code
# row = ['American Studies','Australian Traffic Network','Sales and Marketing Associate',2]
# major = row[0]
# employer = row[1]
# title = row[2]
# count = row[3]
# addIndustryRelations(major, employer, title, count)
# makeSankeyJSON()
# filename = 'tinyindustry.csv'
# makeObject(filename)

## NEW TEST
industryfilename = 'industry.csv'
gradfilename = 'grad.csv'
tracker={}
nodeslist={}
relations = {}
allsankeys = {}
majorslist = []
processIndustry(industryfilename)
processGrad(gradfilename)
makeALLJSONS()

## END TEST CODE

tracker={}
nodeslist={}
relations = {}
allsankeys = {}
majorslist = []
def processIndustry(filename):
	with open(filename, 'r') as f:
		reader = csv.reader(f)
		iterreader = iter(reader)
		next(iterreader)
		for row in iterreader:
			# DO STUFF TO MAKE OBJECT
			major = row[0]
			employer = row[1]
			title = row[2]
			count = row[3]
			majorslist.append(major)
			addIndustryRelations(major, employer, title, count)

def processGrad(filename):
	with open(filename, 'r') as f:
		reader = csv.reader(f)
		iterreader = iter(reader)
		next(iterreader)
		for row in iterreader:
			# DO STUFF TO MAKE OBJECT
			major = row[0]
			school = row[1]
			typegrad = row[2]
			field = row[3]
			count = row[4]
			majorslist.append(major)
			addGradRelations(major, school, typegrad, field, count)

def makeALLJSONS():
	## PROCESS EVERYTHING
	makeSankeyJSON()
	## WRITE TO FILES
	writeSankeyJSONS()


	### IGNORE BELOW ###

test = ['American Studies','Australian Traffic Network','Sales and Marketing Associate',2]
# write files
# def makeObject(name):
# 	filename =''
# 	obj = {}
# 	with open(filename, 'r') as f:
# 		reader = csv.reader(f)
# 		iterreader = iter(reader)
# 		next(iterreader)
# 		for row in iterreader:
# 			# DO STUFF TO MAKE OBJECT
# 	return obj



