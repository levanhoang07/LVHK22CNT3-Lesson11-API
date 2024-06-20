import React from 'react';

export default function LvhCategoryList({ renderLvhCategories, onDelete, onEdit }) {
  const lvhHandleDelete = (lvhCategory) => {
    if (window.confirm(`Bạn có thực sự muốn xóa Category có mã ${lvhCategory.LvhId} không ?`)) {
      onDelete(lvhCategory.LvhId);
    }
  };

  const LvhCategoryElement = renderLvhCategories.map((lvhCategory, index) => (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{lvhCategory.LvhId}</td>
      <td>{lvhCategory.LvhCategoryName}</td>
      <td>{lvhCategory.LvhCategoryStatus ? 'Hiển thị' : 'Tạm khóa'}</td>
      <td>
        <button className="btn btn-warning" onClick={() => onEdit(lvhCategory)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => lvhHandleDelete(lvhCategory)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container m-2">
      <h2>Danh Sách Loại Sản Phẩm</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>Tên loại</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>{LvhCategoryElement}</tbody>
      </table>
      <button className="btn btn-primary" onClick={() => onEdit(null)}>
        Thêm Mới
      </button>
    </div>
  );
}
