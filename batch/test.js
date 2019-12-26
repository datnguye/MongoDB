getSomething = function(p1, p2, p3) {
	return "You did enter: p1="+p1+";p2="+p2+";p3="+p3
};

print((new Date()).toLocaleString() + ': Starting batch...')
var result = getSomething("something","5df1c5fa68059336047249c4", "blah");

print((new Date()).toLocaleString() + ': Resulting...')
print(JSON.stringify(result, null, 2))

print((new Date()).toLocaleString() + ': Finished')