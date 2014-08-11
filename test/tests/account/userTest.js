describe('User', function(){
	beforeEach(module('app'));

	describe('isAdmin', function(){
		it('should return false if the roles array does not have an admin', inject(function(User){
			var user = new User();
			user.roles = ['not admin bro!'];
			expect(user.isAdmin()).to.be.falsey;
		}));

		it('should return true if the roles array has an admin in it', inject(function(User){
			var user = new User();
			user.roles = ['admin'];
			expect(user.isAdmin()).to.be.true;
		}));
	})
})