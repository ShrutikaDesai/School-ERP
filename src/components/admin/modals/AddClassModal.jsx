import React from "react";
import { Modal, Form, Input, Select, Row, Col } from "antd";

const AddClassModal = ({
  open,
  onClose,
  mode,
  initialValues
}) => {

  const isView = mode === "view";
  const isEdit = mode === "edit";

  const modalTitle =
    mode === "add"
      ? "Add New Class"
      : mode === "edit"
      ? "Edit Class"
      : "View Class";

  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={onClose}
      onOk={onClose}
      okText={isView ? "Close" : "Save"}
      destroyOnHidden
      cancelButtonProps={{
        style: {
          display: isView ? "none" : "inline-block"
        }
      }}
      width={700}
      centered
    >
      <Form
        layout="vertical"
        initialValues={initialValues}
      >

        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Class Name" name="className">
              <Input
                disabled={isView}
                placeholder="Enter class name (e.g. 10th A)"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Coordinator" name="teacher">
              <Input
                disabled={isView}
                placeholder="Enter coordinator / teacher name"
              />
            </Form.Item>
          </Col>

        </Row>

        <Row gutter={16}>

          <Col span={12}>
            <Form.Item label="Sections" name="sections">
              <Select
                mode="multiple"
                disabled={isView}
                placeholder="Select sections (A, B, C...)"
                options={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                  { label: "D", value: "D" }
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Students Count" name="students">
              <Input
                disabled={isView}
                placeholder="Enter total number of students"
              />
            </Form.Item>
          </Col>

          {/* <Col span={12}>
            <Form.Item label="Capacity %" name="capacity">
              <Input
                disabled={isView}
                placeholder="Enter capacity percentage (e.g. 80%)"
              />
            </Form.Item>
          </Col> */}

        </Row>

       

      </Form>
    </Modal>
  );
};

export default AddClassModal;