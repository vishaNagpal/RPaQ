import json
import pandas as pd
import matplotlib.pyplot as plt

category_list = ['database', 'backendServices', 'automation', 'frontend', 'management'];


def get_similarity(skills):
    print('reading categories json file')
    file = open(
        '/Users/vishakha.nagpal/development/my_workspace/RPaQ/src/server/keywords/skillCategories.json', )
    skill_categories = json.load(file)
    similarity_list = []
    similarity_object = {}
    count = 0
    for cat in skill_categories:
        if count == 5:
            break
        count = count + 1
        category_key = next(iter(cat))
        same_items_list = [value.lower().strip() for value in skills if value.lower().strip() in cat[category_key]]
        print(same_items_list)
        distance = len(same_items_list) * 100
        print(distance)
        similarity_list.append(distance)
        similarity_object[category_key] = {
            'similarity': distance,
            'similarityList': same_items_list
        }
    file.close()
    return {'similarityObject': similarity_object, 'similarityList': similarity_list, 'categoryList': category_list}


def plot_chart(similarity_list, cat_list):
    data = {'Similarities': similarity_list}
    df = pd.DataFrame(data, columns=['Similarities'], index=cat_list)
    df.plot.pie(y='Similarities', figsize=(5, 5), autopct='%1.1f%%', startangle=90)
    plt.show()


def get_similarity_from_words(words):
    words_list = words.split(",")
    response_object = get_similarity(words_list)
    return response_object


if __name__ == '__main__':
    obj = get_similarity(
        ["Cosmosdb", "Cloudformation", "Dynamodb", "Lambda", "Threading", "Chemistry", "Sns", "Loadbalancer",
         "Database", "Aws", "Ui", "Javascript", "Physics", "Sqs", "Kafka", "Java"])
    print(obj)
    # plot_chart([400,100,100,20,20],obj['categoryList'])

# #    ss=getSimilarity(['Vmware', 'Analysis',
# 'Python', 'Watchdog', 'Architecture', 'Aws', 'Cloud', 'Api', 'Design', 'Agile', 'Saas', 'Security', 'Cisco',
# 'Mysql', 'Service', 'Product owner', 'Inventory', 'Java', 'Scala', 'Technical', 'Health', 'Rest', 'Algorithms',
# 'System', 'Oracle', 'Coding']);
