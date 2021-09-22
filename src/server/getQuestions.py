import json

DIR_PATH = '/Users/vishakha.nagpal/development/my_workspace/RPaQ';
BASE_PROCESS_FILE = DIR_PATH+'/src/server/processed/{0}.txt'
KEY_WORDS_STAT = DIR_PATH+'/src/server/processed/kw.json'

NO_OF_QUESTIONS = 5

def fetchQuestions(skillsList,max_questions_req):
    questionsFound = 0
    questList = []
    print(skillsList)
    for n in range(0, 600):
        text_file = open(BASE_PROCESS_FILE.format(n), "r")
        lines = text_file.readlines();
        for line in lines:
            kw = json.loads(line)["k"]
            ques = json.loads(line)["t"]
            match = any(item in skillsList for item in kw)
            if(match):
                print(kw);
                questionsFound = questionsFound+1
                questList.append({
                    'qId':json.loads(line)["i"],
                    'ques' : ques
                })
            if questionsFound == NO_OF_QUESTIONS:
                break;
        text_file.close()
        if questionsFound == NO_OF_QUESTIONS:
            break;
    return questList;

if __name__ == '__main__':
    # words =  ['loops','pool','posting','graph']
    words = ['javascript', 'typescript', 'flow', 'redux']
    ques = fetchQuestions(['microservices'],1)
    print(ques)

