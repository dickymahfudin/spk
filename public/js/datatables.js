$(document).ready(function () {
  const url = $("#dataTable").attr("url");
  const parsUrl = url.split("/")[1];

  $.ajax({
    type: "GET",
    url,
    dataType: "json",
    success: function (response) {
      if (parsUrl != "dashboard") {
        response.columns.push({
          data: "id",
          title: "",
          searchable: false,
          sortable: false,
          render: function (id, type, full, meta) {
            return `<span><a href="/${parsUrl}/form/${id}" class="modal-open" title="Edit ${full.name}" id="${id}"><i class="fas fa-edit"></i></a> |
              <a href="/${parsUrl}/delete/${id}"  onclick="return confirm('Anda yakin ingin menghapus item ini?');" title="Delete ${full.name}" id="${id}"><i class="fas fa-trash text-danger"></i></a></span>
              `;
          },
        });
      }

      $("#dataTable").DataTable({
        rowReorder: {
          selector: "td:nth-child(2)",
        },
        processing: true,
        retrieve: true,
        responsive: true,
        // dom: "Blrtip",
        data: response.data,
        columns: response.columns,
      });
    },
  });
});
