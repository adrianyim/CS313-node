function jqueryReqest () {
    console.log("In jqueryReqest function");

    // Retrieve data from client side
    let item = $("input[name=item]"), 
        item_type = $("select[name=item-type]"),
        cost = $("input[name=cost"),
        cost_type = $("input[name=cost-type]"),
        remark = $("textarea=remark]"),
        output = $("#output");

    console.log("The retrieve data are: ");
    console.log("Item: ", item);
    console.log("Item_type: ", item_type);
    console.log("Cost: ", cost);
    console.log("Cost_type: ", cost_type);
    console.log("Remark: ", remark);
    
    let params = {item: item, item_type: item_type, cost: cost, cost_type: cost_type, remark: remark};

    let target = "/insertItems?" + params;
    console.log(target);

    $.get(target, (res) => {
        output.append("<div>" + JSON.stringify(res) + "</div>");
    }).fail(() => {
        output.append("<div>" + JSON.stringify({Error: True}) + "</div>");
    });
}