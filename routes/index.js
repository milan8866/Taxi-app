exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.admin = function(req, res){
	  res.render('admin', { title: 'Express' });
	};

exports.login = function(req, res){
	  res.render('login', { title: 'Express' });
	};
	
exports.signup = function(req, res){
	  res.render('signup', { title: 'Express' });
	};
	
exports.signUpCustomer = function(req, res){
	  res.render('customerSignUp', { title: 'Express' });
};

exports.signUpDriver = function(req, res){
	if(req.session.driver){
		req.session.destroy();
		 res.render('driverSignUp', { title: 'Express' });
	}
	else
		{
	  res.render('driverSignUp', { title: 'Express' });}
	};
	
exports.logInCustomer = function(req, res){
	  res.render('loginCustomer', { title: 'Express' });
};

exports.logInDriver = function(req, res){
	  res.render('loginDriver', { title: 'Express' });
	};

	//customer logout
exports.logout=function logout(req,res){
	delete req.session.data;
	res.redirect('/');
}

//driver logout
exports.dlogout=function logout(req,res){
	delete req.session.driver;
	res.render('index');
}