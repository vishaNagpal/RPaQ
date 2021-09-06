from collections import Counter

import yake
import json

#DIR_PATH = '/';
DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace/RPaQ/src/server';

BASE_DATA_FILE = DIR_PATH+'/data/{0}.txt'
BASE_PROCESS_FILE = DIR_PATH+'/processed/{0}.txt'
KEY_WORDS_STAT = DIR_PATH+'/processed/kw.json'

LANGUAGE = 'en'
MAX_N_GRAM_SIZE = 3
DE_DUP_THRESHOLD = 0.9
NUM_Of_KEYWORDS = 5

custom_kw_extractor = yake.KeywordExtractor(lan=LANGUAGE, n=MAX_N_GRAM_SIZE, dedupLim=DE_DUP_THRESHOLD,
                                            top=NUM_Of_KEYWORDS, features=None)


def analyze_file(page_num, key_words_dict):
    f = open(BASE_DATA_FILE.format(page_num))
    of = open(BASE_PROCESS_FILE.format(page_num), 'w')
    for line in f:
        q = json.loads(line)
        keywords = custom_kw_extractor.extract_keywords(q['t'])
        list_of_kw = list()
        for t in keywords:
            kw = t[0].lower()
            # https://stackoverflow.com/questions/45340785/update-counter-collection-in-python-with-string-not-letter
            # this is why, the design of the language is terrible
            key_words_dict.update({kw: 1})
            list_of_kw.append(kw)
        q['k'] = list_of_kw
        pr_data = json.dumps(q) + "\n"
        of.write(pr_data)
    f.close()
    of.close()


if __name__ == '__main__':
    kw = Counter()
    for n in range(590, 601):
        analyze_file(n, kw)
        print(n)
    kf = open(KEY_WORDS_STAT, 'w')
    kf.write(json.dumps(kw, indent=2, sort_keys=True))
    kf.close()
