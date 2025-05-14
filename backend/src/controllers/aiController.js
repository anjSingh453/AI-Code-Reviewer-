const aiService = require("../services/aiServices");

module.exports.getResponse = async (req ,res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).json({error:"code is required"});
    }

    const resposne = await aiService(code)
    res.send(resposne);
}

 
