const Problem = require('../models/problemDetails')


async function findProblemByTitle(req, res)
{
    const title = req.params.title;
    
    if(!Problem.findOne(title))
    {
        return res.status(400).json({error : 'This Question Does Not Exist'})
    }
    return res.status(200).json({message : 'Problem is fetched'})

}

async function addProblem(req, res)
{
    // console.log('Function Called')
    const {title, description, difficulty} = req.body
    // console.log(title)
    // console.log(difficulty)
    // console.log(description)


    success = true
    
    try{
        const probTitle = Problem.find(title)
        if(probTitle)
        {
            // console.log(title)
            success = false
            return res.status(400).json({success , error:'Please use different Question Name'})
        }
        let problemData = await Problem.create({
            title,
            description,
            difficulty,
        })
        return res.status(201).json(problemData)

    }
    catch(err){
       console.error(err.message)
       res.status(500).send("Internal Server Error")
    
    }

}

module.exports = {
    findProblemByTitle,
    addProblem,
}


