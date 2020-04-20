function loadData() {
	var mydata = [
			{ group:'Progression', id:'1', name:'En cours' },
			{ group:'Progression', id:'2', name:'Terminé' },
			{ group:'Progression', id:'3', name:'En cours de production' },
			{ group:'Progression', id:'4', name:'Annulé' },
		];
		return mydata;
}
function ObjectCellRenderer() {
}

ObjectCellRenderer.prototype.init = function (params) {
    this.span = document.createElement('span');
	this.refresh(params);
};

ObjectCellRenderer.prototype.refresh = function(params) {
	this.span.innerHTML = '';
	var nb = 1;
	if(params.value) {
		var val = '';
		val = params.value.val.split(';');
		nb = val.length;
		console.log("Nb=" + nb);
		val = val.join('<br>');
		this.span.innerHTML = val;
		params.node.setRowHeight(25*nb);
		params.api.onRowHeightChanged();
	}
}

ObjectCellRenderer.prototype.getGui = function () {
    return this.span;
};


function ObjectEditor() {

}

var onKeyDown = function(event) {
        var key = event.which || event.keyCode;
        if (key == 37 ||  // left
            key == 39 || // right
            key == 9 ) {  // tab
            event.stopPropagation();
        }
    }

ObjectEditor.prototype.init = function (params) {
	console.log(params);
    this.container = document.createElement('div');

	this.myDropdown=jSuites.dropdown(this.container, {
		data:[
			{ group:'Progression', id:'1', name:'En cours' },
			{ group:'Progression', id:'2', name:'Terminé' },
			{ group:'Progression', id:'3', name:'En cours de production' },
			{ group:'Progression', id:'4', name:'Annulé' },
		],
		type:'default',
		autocomplete:true,
		multiple:false
	});

	if (params.value) {

		var val = params.value.id.split(';');
		console.log(params.value.id);
		this.myDropdown.setValue(val);
	}

};

ObjectEditor.prototype.getGui = function () {
    return this.container;
};

ObjectEditor.prototype.afterGuiAttached = function () {
};

ObjectEditor.prototype.getValue = function () {

    return {id:this.myDropdown.getValue(),val:this.myDropdown.getText()};
};

ObjectEditor.prototype.destroy = function () {
};

ObjectEditor.prototype.isPopup = function () {
    return true;
};


var columns = [
    {headerName: 'Nom usuel', field: 'name', sortable: true, filter: true, rowGroup: true, editable: true},
    {headerName: 'Description et Observation', field: 'description', sortable: true, filter: true, editable: true},
    {headerName: 'Progression', field: 'progress', sortable: true, filter: true, editable: true, cellRenderer: ObjectCellRenderer,cellEditor: ObjectEditor},
    {headerName: 'Typologie', field: 'typology', sortable: true, filter: true, editable: true},
    {headerName: 'Approbation', field: 'approval', sortable: true, filter: true, editable: true},
    {headerName: 'Domaine', field: 'domain', sortable: true, filter: true, editable: true},
    {headerName: 'Typologie SI', field: 'sitypology', sortable: true, filter: true, editable: true},
    {headerName: 'Localisation', field: 'location', sortable: true, filter: true, editable: true},
    {headerName: 'Entité', field: 'entity', sortable: true, filter: true, editable: true},
    {headerName: 'Technologie', field: 'technology', sortable: true, filter: true, editable: true},
    {headerName: 'Network', field: 'name', sortable: true, filter: true, editable: true},
];

var gridOptions = {
    columnDefs: columns,
	rowData: [],
	rowDeselection: true,
    autocomplete:true,
    groupSelectsChildren: true,
    editable: true,
    resizable: true,
    filter: true,
    sortable: true,
    onSelectionChanged: onSelectionChanged,
};

// function onSelectionChanged() {
// 	var selectedRows = gridOptions.api.getSelectedRows();
// 	document.querySelector('#selectedRows').innerHTML =
// 	  selectedRows.length === 1 ? selectedRows[0].description : '';
//   }

function onQuickFilterChanged() {
	gridOptions.api.setQuickFilter(document.getElementById('quickFilter').value);
}

new agGrid.Grid(document.querySelector('#myGrid'), gridOptions);

document.querySelector('#addRow').addEventListener("click", function() {
    gridOptions.api.addItems([{}]);
});
