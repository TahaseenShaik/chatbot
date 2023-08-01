//connect df with server
const dialogflow = require('dialogflow').v2beta1;
const config = require('../config/devkey');


const projectId=config.googleProjectId;
const sessionId=config.dialogFlowSessionID;

const credentials ={
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const KnowledgeBaseId="NzU5NzM4NTEwNDY0MTQ5MDk0NA";
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
//const sessionPath = sessionClient.sessionPath(projectId, sessionId);
const KnowledgeBasePath= 'projects/'+ projectId + '/KnowledgeBases/' + KnowledgeBaseId + '';
const textQuery = async(userText, userId)=>{
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId);
    const request ={ 
        session: sessionPath,
        queryInput:{
            text:{
                text:userText,
                languageCode: config.dialogFlowSessionLanguageCode
            }
        },
        queryParams: {
            KnowledgeBaseNames: [KnowledgeBasePath]
        },
    }
    try{
        const response = await sessionClient.detectIntent(request)
        console.log(response)
        return response[0].queryResult
    }catch(err){
        console.log(err)
        return err
    }

}
module.exports = {
    textQuery
}