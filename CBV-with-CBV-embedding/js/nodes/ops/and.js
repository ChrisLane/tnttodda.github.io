define(function(require) {

	var Op = require('nodes/op');
	var BoolOp = require('nodes/ops/bool');
	var Link = require('link');
	var Flag = require('token').RewriteFlag();

	class AndOp extends Op {

		constructor() {
			super("∧", true);
		}

		copy() {
			return new AndOp();
		}

		rewrite(token) {
			var inLink = this.findLinksInto()[0];
			var outLinks = this.findLinksOutOf();
			
			var b = outLinks.reduce((sum,x) => sum && BoolOp.parseBoolean(this.graph.findNodeByKey(x.to).name), true);

			var newNode = new BoolOp(b,false).addToGroup(this.group);
			var newLink = new Link(inLink.from,newNode.key,"_","_").addToGroup(this.group);

			outLinks.map(x => x.delete());
			outLinks.map(x => this.graph.findNodeByKey(x.to).delete());
			this.delete();

			token.rewriteFlag = Flag.SEARCH;
			return newLink;
		}

	}

	return AndOp;
});
