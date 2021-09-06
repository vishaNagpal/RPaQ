import docx2txt
import PyPDF2
from spacy.matcher import Matcher
import spacy
import pandas as pd
import os

from getSimilarity import *

DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace/RPaQ/src/server';
uploads_dir = '/Users/vishakha.nagpal/development/my_workspace/RPaQ/src/uploads'

def extract(resume):
    temp = docx2txt.process(resume)
    text = [line.replace('\t', ' ') for line in temp.split('\n') if line]
    return ' '.join(text)


def read_pdf_file(filePath):
    pdfFileObj = open(filePath, 'rb')
    pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    pageObj = pdfReader.getPage(0)
    fileText = pageObj.extractText()
    pdfFileObj.close()
    return fileText


def extract_skills(resume_text):
    nlp = spacy.load('en_core_web_sm')
    matcher = Matcher(nlp.vocab)
    nlp_text = nlp(resume_text)
    tokens = [token.text for token in nlp_text if not token.is_stop]
    # reading the csv file
    data = pd.read_csv(DIR_PATH + "/keywords/skills.csv")

    # extract values
    skills = list(data.columns.values)
    skillset = []

    chunks = nlp_text.noun_chunks
    # check for bi-grams and tri-grams (example: machine learning)
    for token in chunks:
        token = token.text.lower().strip()
        if token in skills:
            skillset.append(token)

    # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token)

    return [i.capitalize() for i in set([i.lower() for i in skillset])]


def find_similarity(keywords):
    getSimilarity(keywords)

def getWordsFromResume(file):
    try:
        filename = file.filename;
        file_extension = filename.split('.')[1]
        filePath = os.path.join(uploads_dir,filename);
        file.save(filePath)
        print('reading resume...'+filePath)
        content = file_extension == 'pdf' and read_pdf_file(filePath) or extract(filePath)
        print('resume parsed successfully.. fetching skills now')
        keywords = extract_skills(content)
        print(keywords)
        return keywords;
    except IOError:
        print("Error opening or reading input file")
        return ''
