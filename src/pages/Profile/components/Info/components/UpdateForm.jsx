import React from 'react';
import { Form, Input, Modal, Select, DatePicker, Radio } from 'antd';
import { Formik } from 'formik';

const { Option } = Select;

const UpdateForm = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  validationSchema,
}) => {
  return (
    <Modal
      open={visible}
      title="Update Information"
      onCancel={onCancel}
      onOk={() => onSubmit()}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('Submitting values:', values); // Đảm bảo in giá trị ở đây
          setSubmitting(false);
          // Handle form submission logic here
          onSubmit(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onFinish={handleSubmit}>
            <Form.Item label="Email">
              <Input value={values.email} disabled />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input
                onChange={handleChange}
                value={values.phone}
                name="phone"
              />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input onChange={handleChange} value={values.name} name="name" />
            </Form.Item>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker
                onChange={(date) =>
                  handleChange({ target: { name: 'birthday', value: date } })
                }
                value={values.birthday}
                name="birthday"
              />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              {/* <Radio.Group
                name="gender"
                onChange={(value) =>
                  handleChange({ target: { name: 'gender', value } })
                }
              >
                <p>Gender</p>
                <Radio value={'Male'}>Male</Radio>
                <Radio value={'Female'}>Female</Radio>
              </Radio.Group> */}
              <Select
                onChange={(value) =>
                  handleChange({ target: { name: 'gender', value } })
                }
                value={values.gender}
                name="gender"
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            {/* Additional Select fields can be added similarly */}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateForm;
