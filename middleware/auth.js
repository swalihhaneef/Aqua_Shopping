

const getCurrentUrl = (req) => {
    let currentUrl =req.originalUrl;
  console.log(currentUrl);
  req.session.url = currentUrl
  return currentUrl;
};

const isLogin = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      console.log('islogin');
      next();
    } else {
      getCurrentUrl(req);
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      res.redirect('/home');
    } else {
      next();
    }
  } catch (error) {
    console.log(error.message);
  }
}
const xxx=(req,res,next)=>{
    if(req.session.url){
        
        res.redirect(req.session.url)
    }else{
        next()
    }
}

module.exports = {
  getCurrentUrl,
  isLogin,
  isLogout,
  xxx,
  // Exporting currentUrl along with other functions
};
