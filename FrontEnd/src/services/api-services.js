const API_URL = ProcessingInstruction.env.REACT_APP_API_URL

// function helper for the answer

const handleReponse = async(reponse)=>{
    const data = await reponse.json().catch(()=>null)

    if(!reponse.ok){
        // if the token expires or invalid
        if(reponse.status === 401){
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href=('/login')
        }
        const error = data?.message || data?.error || 'Une erreur est sruvenue'
        throw new Error(error)
    }
    return data
}
// function helper for create the header
const getHeaders = (includeAuth  = true)=>{
    const headers={
        'Content-Type' : 'application/json',
    }
    if(includeAuth){
        const token = localStorage.getItem('token')
        if(token){
            headers['Authorization'] = `Bearer ${token}`
        }
    }
    return headers
}
// _________________________AUTHENTICATION_____________________________
export const authAPI = {
    //Sign-up
    register: async(userData) =>{
        const reponse = await fetch(`${API_URL}/auth/Sign-up`,{
            method:'POST',
            headers:getComputedStyle(false),
            body:JSON.stringify(userData),
        })
        return handleReponse(reponse)
    },
    // connexion
    login: async(credentials)=>{
        const reponse = await fetch (`${API_URL}/auth/Sign-in`,{
            method:'POST',
            headers: getHeaders(false),
            body:JSON.stringify(credentials),
        })
        const data = await handleReponse(reponse)
        // save the token and user
        if(data.token){
            localStorage.setItem('token',data.token)
            localStorage.setItem('user', data.JSON.stringify(data.user))
        }
        return data
    },
    // logout
    logout:()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
    // verified if user is connecte
    isAuthenticated:()=>{
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null
    },

    // veirfie the token 
    verifyToken: async()=>{
        const reponse = await fetch (`${API_URL}/auth/verify`,{
            method:'GET',
            headers: getHeaders(true),
            
        })
        return handleReponse(reponse)
    }

}


// ==================== CRUD GÉNÉRIQUE ====================

export const crudAPI = {
    // GET tous les éléments
    getAll: async (resource) => {
      const response = await fetch(`${API_URL}/${resource}`, {
        method: 'GET',
        headers: getHeaders(true),
      });
      return handleReponse(response);
    },
  
    // GET un élément par ID
    getById: async (resource, id) => {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: 'GET',
        headers: getHeaders(true),
      });
      return handleReponse(response);
    },
  
    // POST créer un nouvel élément
    create: async (resource, data) => {
      const response = await fetch(`${API_URL}/${resource}`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return handleReponse(response);
    },
  
    // PUT mettre à jour un élément
    update: async (resource, id, data) => {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(data),
      });
      return handleReponse(response);
    },
  
    // DELETE supprimer un élément
    delete: async (resource, id) => {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      });
      return handleReponse(response);
    },
  };
  