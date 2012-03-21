// Simple script to extract member names from ExtJS class definition.
//
// Run like so:
//
// node extract.js extjs/src/Component.js
//
// It will only work when file starts with Ext.define(...);
// Luckily these are the majority of ExtJS files.
//
var esprima = require("esprima");
var fs = require('fs');
var filename = process.argv[2];

function fail(type) {
    console.log("FAILURE: "+type+" expected.");
}

fs.readFile(filename, 'ascii', function(err, data) {
    if (err) {
        console.error("Could not open file: %s", err);
        process.exit(1);
    }

    var statement = esprima.parse(data).body[0];
    if (statement.type !== "ExpressionStatement") return fail("ExpressionStatement");
    var expr = statement.expression;

    // Allow for for Node.js style: module.export = Ext.define(...
    if (expr.type === "AssignmentExpression") {
        var left = expr.left;
        if (left.type !== "MemberExpression") return fail("MemberExpression");
        if (!left.object || left.object.name !== "module") return fail("module");
        if (!left.property || left.property.name !== "export") return fail("module.export");
        // continue with Ext.define() on right hand side
        expr = expr.right;
    }

    if (expr.type !== "CallExpression") return fail("CallExpression");

    var callee = expr.callee;
    if (callee.type !== "MemberExpression") return fail("MemberExpression");
    if (!callee.object || callee.object.name !== "Ext") return fail("Ext");
    if (!callee.property || callee.property.name !== "define") return fail("Ext.define");

    var args = expr.arguments;
    if (args.length < 2) return fail("2 args for Ext.define");

    var className = args[0];
    if (className.type !== "Literal") return fail("Literal as 1st arg of Ext.define");
    console.log("class: " + className.value);

    var cfg = args[1];
    if (cfg.type !== "ObjectExpression") return fail("Object as 2nd arg of Ext.define");

    cfg.properties.forEach(function(p) {
        console.log("    " + p.key.name);
    });
});


