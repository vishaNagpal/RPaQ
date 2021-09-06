import { IDBModel } from "../db/dbInterface";

const questionsData : IDBModel []= [
    {
        qId:"1",
        qName:'String Evaluation',
        description:'',
        labels:['order','parsing','stack'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:'Evaluate : (a) 1+2*3    -> 7 \n (b) (1+2)*3  -> 9'
    },
    {
        qId:"2",
        qName:'Closest matching Word',
        description:'',
        labels:['pattern', 'matching', 'closest', 'suggestions'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`find nearest word from the given non-english dictionary which is one off character. (could be non ascii characters)
        for eg. dictionary contains { apple, pineapple, banana, orange }
        
        if given word ""applx"" then return true, as applx matches with apple and only one character is off.
        aplpe returns false`
    },
    {
        qId:"3",
        qName:'String Comparison 1',
        description:'',
        labels:['string' ,'matching', 'pattern', 'duplicates'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`"Compare strings based on n grams.
        e.g str1 – Today is Sunday.
        str2 – Today is Saturday
        if n = 2 then number of duplicates is 1 (Today is)
        if n = 1 then number of duplicates is (Today, is)
        if n = 3 duplicates is 0"`
    },
    {
        qId:"4",
        qName:'Closest Matching word',
        description:'',
        labels:['string' ,'matching', 'pattern','closest', 'suggestions','search'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`"find nearest word from the given non-english dictionary which is one off character. (could be non ascii characters)
        for eg. dictionary contains { apple, pineapple, banana, orange }
        
        if given word ""applx"" then return true, as applx matches with apple and only one character is off.
        aplpe returns false
        
        "`
    },
    {
        qId:"5",
        qName:'Sliding Window problem',
        description:'',
        labels:['sliding window' ,'sequence'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Shops in a row - shop [i] selling only single type of vegetable 
        You have 2 baskets and each basket can hold any no of vegetables but the type has to be same
        Start from any shop but have to keep picking vegetables till you can from once you start
        
        
        What is the total amount of vegetables you can collect with this procedure?\n
        Input: [0,1,2,2]
Output: 3
Input: [1,2,3,2,2]
Output: 4
Explanation: We can collect [2,3,2,2].
Input: [3,3,3,1,2,1,1,2,3,3,4]
Output: 5`
    },
    {
        qId:"6",
        qName:'Closest Matching word',
        description:'',
        labels:['string' ,'matching', 'pattern','dictionary','replace'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Write a function that takes a string and a dictionary as input and looks up any bracketed string ("{}",
        "[]", "()") and replaces it with its value in the dictionary.
        
        "Two mathematicians walk into a {foo} holding a {drink}.", {"foo": “bar”,”drink"} -> "Two mathematicians walk into a bar.”
        "Two mathematicians walk into [a {foo}].", {"foo": "bar”, “ abar”:”space bar"} -> "Two mathematicians walk into space bar.”`
    },
    {
        qId:"7",
        qName:'Validate brackets',
        description:'',
        labels:['string' ,'stack', 'pattern','brackets','validate','pipe bracket'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Validate brackets ->
            a) (a+[a+b])*(c)  -> true
            b) (a+b)]  -> false
            c) (a+|b|) -> true
        
        `
    },
    {
        qId:"8",
        qName:'Find clusters in graph',
        description:'',
        labels:['grapgh' ,'clusters', 'isolate','DFS'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`You are given a grid represnting city divided in regions. \n
        Each region is marked as 1 if it has a Covid-19 case in it.
        Find no. of clusters in the city. A cluster can be of size 1 or more.
       
       1 0 0 0 1 1
       1 0 0 0 1 1
       0 0 0 1 0 0`
    },
    {
        qId:"9",
        qName:'Conflicting Schedule of prices',
        description:'',
        labels:['conflicting' ,'vendors','dates','price period','schedule'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`There is going to be a sale during this month. You are interested in a particular item \n
         and you found that different Vendors have different prices during different time periods. \n
         You collected the following information:


        Vendor => (start date, end date, price) both sides inclusive
        A => (1, 5, $20)
        B => (3, 6, $15)
        C => (2, 8, $25)
        D => (7, 12, $18)
        E => (1, 31, $22)
        As you can see, there are conflicting entries. You need to print out a non-conflicting schedule of prices, taking the best price from each period:
        
        e.g.
        (1, 2, $20), (3, 6, $15), (7, 12, $18), (13, 31, $22)
        
        `
    },
    {
        qId:"10",
        qName:'Make two strings equal by adding a word or group of words together',
        description:'',
        labels:['string' ,'matching', 'pattern','replace','equal strings','parsing'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Return true of one of the two strings can be made equal to another string by adding a
         word or a group of word.


        str1 = "hello alpha", str2 = "hello my name is alpha" => true, "my name is"
        str1 = "is alpha", str2 = "hello my name is alpha" => true, "hello my name"
        String str1 = "name alpha", str2 = "hello my name is alpha" => false`
    },
    {
        qId:"11",
        qName:'Binary Tree Reflection',
        description:'',
        labels:['tree' ,'reflection', 'mirroring','replica'],
        level_of_difficulty:'Easy',
        gist_link:'',
        detailed_desc:`Create a reflection of the binary tree :
            1                                   1
        3       2              -->          2       3
              5   4                        4 5       

        `
    },
    {
        qId:"12",
        qName:'Currency Exchange Problem',
        description:'',
        labels:['currency exchange' ,'exchange rates'],
        level_of_difficulty:'',
        gist_link:'',
        detailed_desc:`Given a list of currency exchange rates like this:
        EUR/USD => 1.2
        USD/GBP => 0.75
        GBP/AUD => 1.7
        AUD/JPY => 90
        GBP/JPY => 150
        JPY/INR => 0.6
        
        write a method
        double convert(String sourceCurrency, double amount, String destCurrency);
        For example, convert(EUR, 100, INR)
        
        The method should minimize the number of intermediate conversions.
        
        `
    },
    {
        qId:"13",
        qName:"Singleton Design Pattern Modification",
        description:'',
        labels:['singelton' ,'design patterns','SOLID Principles',''],
        level_of_difficulty:'',
        gist_link:'https://www.careercup.com/question?id=6259418600570880',
        detailed_desc:`
        Singleton Design pattern. How you make it double ton(in even call of getInstance() first object \n
         should be return and odd call of getInstance() second instance should be return). Make it triple ton.

        `
    }
]

export {questionsData};