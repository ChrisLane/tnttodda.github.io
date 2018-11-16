
define('dnet', function(require) {

	var Group = require('group');
	var Link = require('link');
	var Contract = require('nodes/contract');

	class DNet extends Group {

		constructor(ctx, inputs, op) {
			super(null, null, null);
      this.inputs = inputs;

      this.outputs = this.createDNet(ctx, inputs, op);
		}

    createDNet(ctx, inputs, op) {
      var c;
      var from;
      var to;
      var cList = [];

      for (var n = 0; n < ctx.length; n++) {
        c = new Contract(ctx[n].name).addToGroup(this);
        cList.push(c);

      if (inputs.length == 0) // maybe this needs to be "more elegant"
        new Link(op.key, c.key, "_", "_", "lightgrey").addToGroup(this);
      }

      for (var i = 0; i < inputs.length; i++) {
        from = inputs[i]; to = cList[(i%(ctx.length))];
        new Link(from.key, to.key, "_", "_").addToGroup(this);
      }

      return cList;
    }

}

	return DNet;
});
