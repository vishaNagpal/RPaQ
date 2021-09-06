import requests
from bs4 import BeautifulSoup
import json
import time

#DIR_PATH = '/System/Volumes/Data/Codes/python';
DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace';

BASE_PAGE_URL = 'https://www.careercup.com/page?n={0}'
BASE_PROBLEM_URL = 'https://www.careercup.com/question?id={0}'
BASE_DATA_FILE = DIR_PATH+'/cc-search/data/{0}.txt'

def get_question_ids(page_num):
    my_url = BASE_PAGE_URL.format(page_num)
    page = requests.get(my_url)
    soup = BeautifulSoup(page.content, 'html.parser')
    questions = soup.find(id='question_preview')
    job_elems = questions.find_all('span', class_='entry')
    of = open(BASE_DATA_FILE.format(page_num), 'w')
    for q in job_elems:
        link = q.find('a')
        my_id = link['href'][13:]
        my_text = link.text.strip()
        q_m = {'i': my_id, 't': my_text}
        line = json.dumps(q_m) + "\n"
        of.write(line)
        print('page {0} id {1}'.format(page_num, my_id))
    of.close()


if __name__ == '__main__':
    for page_no in range(1, 15):
        get_question_ids(page_no)
        time.sleep(1.3)

