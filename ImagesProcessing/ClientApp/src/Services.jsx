import httpCommon from "./http-common";

class Services{
    //User Functions
    postIamges(data){
        return httpCommon.post("/Image", data);
    }
}

export default new Services();