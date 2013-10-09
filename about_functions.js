var ___ = "Fill me in!";

exports.functions_are_their_own_type = function(test) {
	test.equal('function', typeof(function() {}));
	test.done();
};

exports.functions_are_invoked_using_parantheses_syntax = function(test) {
	var result = function(x, y) { return x * y; }(5, 5);
	test.equal(25, result);
	test.done();
};

exports.functions_assigned_to_variables_can_be_called_by_variable_name = function(test) {
  var multiply = function(x, y) { return x *  y; };
  test.equal(25, multiply(5, 5));
  test.done();
};

exports.functions_can_be_defined_as_an_object = function(test) {
  var multiply = new Function("x", "y", "return x * y");
  test.equal(25, multiply(5, 5));
  test.done();
};

exports.functions_can_have_properties_just_like_objects = function(test) {
	function isEven(num) {
    if(typeof(isEven.cache) === "undefined") isEven.cache = {};

    if(isEven.cache[num] === undefined) {
      isEven.cache[num] = (num % 2 === 0 ? true : false);
    }

		return isEven.cache[num];
	}

	var two = new Number(2);
  var result = isEven(two);
  var nextResult = isEven(two);

	test.equal(true, result);
  test.equal(true, isEven.cache[2]);
  test.equal(true, result === nextResult);
	test.done();
};

exports.functions_length_is_the_number_of_expected_arguments = function(test) {
  var multiply = function(x, y) { return x * y; };
  test.equal(2, multiply.length);
  test.done();
};

exports.functions_can_be_used_to_control_scope = function(test) {
  var publicValue = "blah";

	(function(p) {
        var privateValue = "password";
        test.equal(p, "blah", 'what is the value of p?');
        test.equal("password", privateValue, "is privateValue available in this context?");
        test.equal(typeof(privateValue), "string", "is privateValue available in this context?");
        test.equal("blah", publicValue, "is publicValue available in this context?");
        test.equal(typeof(publicValue), "string", "is publicValue available in this context?");
  })(publicValue);

  test.equal(typeof(privateValue), "undefined", "is privateValue available in this context?");
  test.equal(typeof(publicValue), "string", "is publicValue available in this context?");
  test.done();
};

exports.named_functions_can_be_called_before_they_are_defined = function(test) {
	test.equal(25, my_amazing_multiply(5, 5));

	function my_amazing_multiply(x, y) { return x * y; }
	test.done();
};

exports.functions_without_an_explicit_return_value_return_undefined = function(test) {
  var dontForgetReturn = function(a, b) {
    a * b;
  };

  test.equal(undefined, dontForgetReturn(5, 5));
  test.done();
};

exports.arguments_are_not_enforced = function(test) {
	var sayHello = function(name) {
    return "Hello " + name;
	};

	test.equal("Hello undefined", sayHello());
	test.equal("Hello Dan", sayHello("Dan"));
	test.done();
};

exports.arguments_to_functions_can_be_explict_or_implict = function(test) {
	var repeat = function() {
		var result = [];
		for(var arg in arguments) {
			result.push(arguments[0]);
			result.push(arguments[0]);
		}
    return result;
	};

	test.deepEqual([], repeat());
	test.deepEqual(["hello", "hello"], repeat("hello"));
	test.done();
};

exports.functions_invoked_using_call_can_change_the_context = function(test) {
	var reflection = function() {
		var firstProperty = Object.keys(this)[0];
		return this[firstProperty];
	};

	var person = {
		name: "Dan"
	};

	var car = {
		brand: "Ferrari"
	};

	test.equal("Dan", reflection.call(person));
	test.equal("Ferrari", reflection.call(car));
	test.done();
};

exports.singleton_functions_can_be_defined_on_single_objects = function(test) {
	var numbers = [1, 2, 3, 4, 5];
	numbers.double = function(n) {
		for(var i = 0; i < this.length; i++) {
			this[i] *= 2;
		}
		return this;
	};

	numbers.double();

	test.equal(2, numbers[0]);
	test.equal(4, numbers[1]);
	test.equal(6, numbers[2]);
	test.equal(8, numbers[3]);
	test.equal(10, numbers[4]);

	var other_numbers = [1, 2, 3, 4, 5];
	try {
		other_numbers.double();
	}
	catch(err) {
		test.equal('TypeError', err.name);
	}
	test.done();
};