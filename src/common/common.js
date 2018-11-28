let cascade = module.exports.cascade = function(ary, idField, parentField, rootNodeValue){
    let children = ary.filter((n) => { return n[parentField] === rootNodeValue; });

    children.forEach((n) => {
        n.children = cascade(ary, idField, parentField, n[idField]);
    });

    return children.length ? children : [];
};
