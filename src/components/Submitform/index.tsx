import React, { useState } from 'react';
import { Form, Input, Button, InputNumber, Select, Space } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const onChange = (value: any) => {
    console.log('changed', value);
};

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

const provinceData = ['NULL', 'YES_NO', 'WOODSPECIES', 'VIBRIO', 'VERT_HORI', 'VALID_INVALID', 'TYPE_OF_FAILURE', 'SURFACE_TEXTUREO', 'STL_TS_BS_3692_REMAR', 'STL_TS_BS_3692_FAI_M', 'STL_TENSILE_2012',
    'STL_TENSILE_1995', 'STL_PL_N_898_STYLE', 'STL_MESH98_REBE', 'STL_MESH_SHEA_FACTU', 'STL_IMP_BROKEN', 'STL_GRADE_10210', 'STL_GRADE_10025', 'STL_CS2_95_REBE', 'STL_CS2_95_BEND',
    'STL_CS2_12_REBE', 'STL_COUP_ELG_POST_F', 'STL_COMPLY_NOTCOMPLY', 'STL_898_TS_BS_NOMSIZ', 'STL_898_TS_BS_GRADE', 'STL_898_NOMSIZE', 'STL_898_GRADE', 'STL_3692_NOMSIZE', 'STL_3692_GRADE',
    'STL_3692_FAILMODE', 'STL_10025_SPEC', 'STD_OTHER', 'SPECIMEN_TYPE_BD', 'SOILING_MEDIUM', 'SO2_1', 'ROC_POINT_LOAD_LOCAT', 'RECEIVE_OVEN', 'READYTOEATFOOD_CO14', 'READYTOEATFOOD_CAT14',
    'READYTOEAT_FOOD_CAT', 'PROPORTIONAL', 'POS_NEG', 'PASS_FAIL', 'PAINTPANEL', 'NORM_ABNORM', 'NOR_POOR', 'NO', 'MOTOR_CUBE_MODEOFAIL', 'MOIS_CON', 'MACHINED'] as any;

const cityData = {
    NULL: ['NULL'] as any,
    YES_NO: ['No,Yes'] as any,
    WOODSPECIES: ['Fagus sylvatica Linnaeus (hardwoods),Pinus sylvestris Linnaeus (softwoods)'] as any,
    VIBRIO: ['Vibrio cholera,Vibrio parahaemolyticus,Vibrio species (others)'] as any,
    VERT_HORI: ['Horizontal,Vertical'] as any,
    VALID_INVALID: ['Invalid,Valid'] as any,
    TYPE_OF_FAILURE: ['SATISFACTORY,UNSATISFACTORY'] as any,
    SURFACE_TEXTURE: ['CRYSTALLINE,GRANULAR,HONEYCOMBED,GLASSY,ROUGH,SMOOTH'] as any,
    STL_TS_BS_3692_REMAR: ['The tensile strength comply with BS 3692 : 2001, Table 2,The tensile strength fail to comply with BS 3692 : 2001, Tables 2'] as any,
    STL_TS_BS_3692_FAI_M: ['Fracture between head and shank,Fracture in nut or fixture,The figure is invalid,Fracture in shank of bolt or screw,Nut slips off bolt or screw,Fracture in thread of bolt or screw'] as any,
    STL_TENSILE_2012: ['250,500,500'] as any,
    STL_TENSILE_1995: ['250,460'] as any,
    STL_PL_N_898_STYLE: ['STYLE 1,STYLE 2'] as any,
    STL_MESH98_REBE: ['fracture,without fracture'] as any,
    STL_MESH_SHEA_FACTU: ['Bar beark,Welded Intersection'] as any,
    STL_IMP_BROKEN: ['Broken - The test piece has passed through the machine anvils unseparated but can be separated into two pieces by bare hands,Broken - The test piece has passed through the machine anvils and separated into two pieces.,Broken - The Test piece has passed through the machine anvils unseparated and cannot be separated into two pieces by bare hands.,Deformed - The test piece has passed through the machine anvils and the test result is indeterminable. The impact value for the test specimen exceeds the maximum energy rating of the machine or the range used.'] as any,
    STL_GRADE_10210: ['S235JRH,S275J0H,S275J2H,S275NH,S275NLH,S355J0H,S355J2H,S355K2H,S355NH,S355NLH,S420NH,S420NLH,S460NH,S460NLH'] as any,
    STL_GRADE_10025: ['S235J0,S235J2,S235JR,S275J0,S275JR,S275M,S275ML,S355J0,S355J2,S355JR,S355K2,S355M,S355ML,S420M,S420ML,S450J0,S460M,S460ML'] as any,
    STL_CS2_95_REBE: ['break into two pieces,not break into two pieces'] as any,
    STL_CS2_95_BEND: ['sign of cracks,no sign of cracks'] as any,
    STL_CS2_12_REBE: ['sign of fracture or visible cracks,no sign of fracture or visible cracks'] as any,
    STL_COUP_ELG_POST_F: ['Postion of fracture at parent bar,Position of fracture at connector,Parent bar slipped out from the coupler'] as any,
    STL_COMPLY_NOTCOMPLY: ['Comply,Doubtful,Not comply,See remark 1,See remark 2,See remark 3,See remark 4,See remark 5,See remark 6,See remark 7,See remark 8'] as any,
    STL_898_TS_BS_NOMSIZ: ['NULL'] as any,
    STL_898_TS_BS_GRADE: ['NULL'] as any,
    STL_898_NOMSIZE: ['NULL'] as any,
    STL_898_GRADE: ['NULL'] as any,
    STL_3692_NOMSIZE: ['NULL'] as any,
    STL_3692_GRADE: ['10,12,4,5,6,8'] as any,
    STL_3692_FAILMODE: ['+,TS/B,TS/N'] as any,
    STL_10025_SPEC: ['BS EN 10025-2,BS EN 10025-4'] as any,
    STD_OTHER: ['Others,Standard'] as any,
    SPECIMEN_TYPE_BD: ['Anchor Bolt,Mild Steel Bar,High Yield Bar'] as any,
    SOILING_MEDIUM: ['Artificial,Natural,None'] as any,
    SO2_1: ['Less intense,More intense,Similar'] as any,
    ROC_POINT_LOAD_LOCAT: ['In laboratory,On site'] as any,
    RECEIVE_OVEN: ['As received,Oven-dried'] as any,
    READYTOEATFOOD_CO14: ['Borderline,Not applicable,Satisfactory,Unsatisfactory'] as any,
    READYTOEATFOOD_CAT14: ['Category 1,Category 10,Category 11,Category 12,Category 13,Category 14,Category 2,Category 3,Category 4,Category 5,Category 6,Category 7,Category 8,Category 9'] as any,
    READYTOEAT_FOOD_CAT: ['Category 1,Category 2,Category 3,Category 4,Category 5'] as any,
    PROPORTIONAL: ['Proportional,Non-proprtional'] as any,
    POS_NEG: ['Negative,Positive'] as any,
    PASS_FAIL: ['Fail,Pass'] as any,
    PAINTPANEL: ['Metal ~1mm thick,Other material,Plaster ~10mm thick,Wood ~10mm thick'] as any,
    PAINTAPPLY: ['Brushing,Dipping,Other method,Spraying'] as any,
    NORM_ABNORM: ['--,Abnormal,Normal'] as any,
    NOR_POOR: ['Normal,Poor'] as any,
    NO: ['No'] as any,
    MOTOR_CUBE_MODEOFAIL: ['Asymmetric failure,Brittle failure,Normal failure,Plastic deformation'] as any,
    MOIS_CON: ['As received,Saturated'] as any,
    MACHINED: ['Machined,Unmachined'] as any,
};

type CityName = keyof typeof cityData;

const FormComponent = () => {
    const onFinish = (values: any) => {
        // 发送表单数据到后端 API
        axios.post('/api/submit-form', values)
            .then(response => {
                console.log('Form submitted successfully');
            })
            .catch(error => {
                console.error('Error submitting form: ', error);
            });
    };

    const [disabled, setDisabled] = useState(true);

    const toggle = () => {
        setDisabled(!disabled);
    };

    const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
    const handleProvinceChange = (value: CityName) => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };
    const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
    };

    return (
        
        <Form onFinish={onFinish}>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
           
            <Form.Item
                name="Analysis"
                label="Analysis"
                rules={[{ required: true, message: 'Please enter the Analysis' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="Name"
                label="Name"
                rules={[{ required: true, message: 'Please enter the Name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="Description"
                label="Description"
            >
                <Input />
            </Form.Item>
            
            <Form.Item
                name="Reported Name"
                label="Reported Name"
            >
                <Input />
                </Form.Item>

            <div style={{ textAlign: 'left', paddingLeft: 0, color: 'black' }}>
               Order Number:
               <InputNumber
                    name="Ordernumber"
                    min={1}
                    max={999}
                    defaultValue={1}
                    onChange={onChange} />
            </div>

                         
            <Space>
                <p>List key:</p>
                <Select
                    defaultValue={provinceData[0]}
                    style={{ width: 120 }}
                    onChange={handleProvinceChange}
                    options={provinceData.map((province: any) => ({ label: province, value: province }))}
                />
                <p>List value: </p>
                <Select
                    style={{ width: 120 }}
                    value={secondCity}
                    onChange={onSecondCityChange}
                    options={cities.map((city: any) => ({ label: city, value: city }))}
                />
            </Space>

           <Space>
            Result type:
            <Select
                defaultValue="Y"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'Y', label: 'Y' },
                    { value: 'D', label: 'D' },
                    { value: 'F', label: 'F' },
                    { value: 'L', label: 'L' },
                    { value: 'N', label: 'N' },
                    { value: 'T', label: 'T' },
                    { value: 'U', label: 'U' },
                ]}
            />


            Optional:
            <Select
                defaultValue="T"
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'T', label: 'T' },
                    { value: 'F', label: 'F' },
                ]}
            />
            

            Display string:
            <Select
                defaultValue="-"
                style={{ width: 120 }}
                onChange={handleChange}
                    options={[
                        { value: '-', label: '-' },
                        { value: 'cysts/L', label: 'cysts/L' },
                        { value: 'CU', label: 'CU' },
                        { value: 'coulombs', label: 'coulombs' },
                        { value: 'cm²/g', label: 'cm²/g' },
                        { value: 'cfu', label: 'cfu' },
                        { value: 'cfu/swab', label: 'cfu/swab' },
                        { value: 'cfu/mL', label: 'cfu/mL' },
                        { value: 'cfu/m³', label: 'cfu/m³' },
                        { value: 'cfu/g', label: 'cfu/g' },
                        { value: 'cfu/250ml', label: 'cfu/250ml' },
                        { value: 'cfu/10mL', label: 'cfu/10mL' },
                        { value: 'cfu/100mL', label: 'cfu/100mL' },
                        { value: 'cfu/0.1mL', label: 'cfu/0.1mL' },
                        { value: 'days', label: 'days' },
                        { value: 'FNU', label: 'FNU' },
                        { value: 'g', label: 'g' },
                        { value: 'g/L', label: 'g/L' },
                        { value: 'g/kg of available chlorine', label: 'g/kg of available chlorine' },
                        { value: 'g/kg', label: 'g/kg' },
                        { value: 'g/cm³', label: 'g/cm³' },
                        { value: 'g/100g', label: 'g/100g' },
                        { value: 'Hrs', label: 'Hrs' },
                        { value: 'Joules', label: 'Joules' },
                        { value: 'Joints', label: 'Joints' },
                        { value: 'kPa', label: 'kPa' },
                        { value: 'kN', label: 'kN' },
                        { value: 'kN/s', label: 'kN/s' },
                        { value: 'kJ/kg', label: 'kJ/kg' },
                        { value: 'kg', label: 'kg' },
                        { value: 'kg/m³', label: 'kg/m³' },
                        { value: 'K', label: 'K' },
                        { value: 'L/min', label: 'L/min' },
                        { value: 'mPD', label: 'mPD' },
                        { value: 'MPa', label: 'MPa' },
                        { value: 'mm', label: 'mm' },
                        { value: 'mm²', label: 'mm²' },
                        { value: 'mL', label: 'mL' },
                        { value: 'mL /min', label: 'mL /min' },
                        { value: 'min', label: 'min' },
                        { value: 'mins', label: 'mins' },
                        { value: 'min:sec', label: 'min:sec' },
                        { value: 'mg', label: 'mg' },
                        { value: 'mgKOH/g', label: 'mgKOH/g' },
                        { value: 'mg/m³', label: 'mg/m³' },
                        { value: 'mg/L', label: 'mg/L' },
                        { value: 'mg/kg', label: 'mg/kg' },
                        { value: 'mg/cap', label: 'mg/cap' },
                        { value: 'mg/100g', label: 'mg/100g' },
                        { value: 'mg S²⁻/L', label: 'mg S²⁻/L' },
                        { value: 'mg PO₄³⁻-P/L', label: 'mg PO₄³⁻-P/L' },
                        { value: 'mg O₂/L', label: 'mg O₂/L' },
                        { value: 'mg NO₃⁻N/L', label: 'mg NO₃⁻N/L' },
                        { value: 'mg N/L', label: 'mg N/L' },
                        { value: 'mg F⁻/L', label: 'mg F⁻/L' },
                        { value: 'mg CTAS', label: 'mg CTAS' },
                        { value: 'mg CN⁻/L', label: 'mg CN⁻/L' },
                        { value: 'mg CaO/mL', label: 'mg CaO/mL' },
                        { value: 'mg CaCO₃/L', label: 'mg CaCO₃/L' },
                        { value: 'mg C/L', label: 'mg C/L' },
                        { value: 'mg C', label: 'mg C' },
                        { value: 'mequiv/Kg', label: 'mequiv/Kg' },
                        { value: 'mA', label: 'mA' },
                        { value: 'm', label: 'm' },
                        { value: 'm²/kg', label: 'm²/kg' },
                        { value: 'm³', label: 'm³' },
                        { value: 'MPN/25g', label: 'MPN/25g' },
                        { value: 'N', label: 'N' },
                        { value: 'NTU', label: 'NTU' },
                        { value: 'ng', label: 'ng' },
                        { value: 'N/s', label: 'N/s' },
                        { value: 'N/mm²', label: 'N/mm²' },
                        { value: 'orgs./L', label: 'orgs./L' },
                        { value: 'ppt', label: 'ppt' },
                        { value: 'ppm', label: 'ppm' },
                        { value: 'ppb', label: 'ppb' },
                        { value: 'pH units', label: 'pH units' },
                        { value: 's', label: 's' },
                        { value: 'secs', label: 'secs' },
                        { value: '2.5 L', label: '2.5 L' },
                        { value: '1/cm', label: '1/cm' },
                        { value: 'µS/cm', label: 'µS/cm' },
                        { value: 'µm', label: 'µm' },
                        { value: 'µL', label: 'µL' },
                        { value: 'µg', label: 'µg' },
                        { value: 'µg/mL', label: 'µg/mL' },
                        { value: 'µg/L', label: 'µg/L' },
                        { value: 'µg/kg', label: 'µg/kg' },
                        { value: 'µg/100mL', label: 'µg/100mL' },
                        { value: 'µg MBAS', label: 'µg MBAS' },
                        { value: 'µg CN⁻/L', label: 'µg CN⁻/L' },
                        { value: '°C', label: '°C' },
                        { value: '°', label: '°' },
                        { value: '/25g', label: '/25g' },
                        { value: '%', label: '%' },
                        { value: '%wt', label: '%wt' },
                        { value: '%/mm', label: '%/mm' },
                        { value: '% w/w', label: '% w/w' },
                        { value: '% mass', label: '% mass' },
                        { value: '% (w/w) of available chlorine', label: '% (w/w) of available chlorine' },
                        { value: '% mass', label: '% mass' },
                ]}
                    />
                    <div>
                    <InputNumber<string>
                        style={{ width: 200 }}
                        disabled={disabled}
                        addonBefore="Minimum"
                        defaultValue="NULL"
                        min="-999"
                        max="999"
                        step="0.0000000000001"
                        onChange={onChange}
                        stringMode
                    />

                    <InputNumber<string>
                        style={{ width: 200 }}
                        disabled={disabled}
                        addonBefore="Maximum"
                        defaultValue="NULL"
                        min="0"
                        max="99999"
                        step="0.01"
                        onChange={onChange}
                        stringMode
                    />                   
                    

                    <Button onClick={toggle} type="primary">
                        Set
                        </Button>    
                    </div>
                </Space>

            
            
         
            <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
                </div>
            </Space >
        </Form>
      
    );
};

export default FormComponent;
