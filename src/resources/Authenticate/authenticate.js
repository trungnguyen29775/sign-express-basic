module.exports =  function Authenticate(check,users)
{
    for(let user of users)
    {
        if(user.username == check.username && user.password == check.password)
            return true
    }
    return false
}