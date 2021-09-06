export interface IPieData {
    title: string;
    value: number;
    color: string;
}

export interface IQuestionsData{
    qId: string
    ques: string
    level_of_difficulty: string
    gist_link: string
}

export interface ISimilarityItem{
    similarity : number
    similarityList : string[]
}

export interface IResponseObject{
    similarityList?:number[]
    categoryList?:string[]
    similarityObject?:Record<string, ISimilarityItem>
    questionsList?:IQuestionsData[]
}