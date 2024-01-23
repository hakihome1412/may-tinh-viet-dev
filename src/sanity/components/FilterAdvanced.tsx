import { Form, Radio } from "antd";
import { getDataFilterAdvanced } from "../utils";
import { useEffect, useState } from "react";
import { PatchEvent, set } from "sanity";
import { FormStyled } from "./styled";

export default function FilterAdvanced({
  value,
  onChange,
}: {
  value?: any;
  onChange?: any;
}) {
  const [dataFilterAdvanced, setDataFilterAdvanced] = useState([]);

  const initData = async () => {
    const data = await getDataFilterAdvanced();
    setDataFilterAdvanced(data);
  };

  const handleValuesChange = (_: any, values: any) => {
    onChange(PatchEvent.from(set(values)));
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <FormStyled
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={value}
    >
      {dataFilterAdvanced.map((item: any) => (
        <Form.Item label={item.name} name={item.slug} key={item.slug}>
          <Radio.Group>
            {item.options.map((it: any) => (
              <Radio key={it.slug} value={it.slug}>
                {it.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
      ))}
    </FormStyled>
  );
}
