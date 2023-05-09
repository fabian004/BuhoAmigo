import { useQuery } from '@apollo/client';
import { getServices } from '../../../routes/services'
import {
    IonButton,
    IonSelect,
    IonSelectOption,
  } from '@ionic/react';
import Employees from "./Employees";
interface ServicesProps {
    rows: any[];
    Hour: string;
    Date: string;
    setRows: any;
    children?: React.ReactNode;
  }

const defaultState = {
  serviceId: "",
  employeeId: "",
  order:""
  };

  function RowServices({ onChange, onRemove, serviceId, employeeId,Date,Hour,rows }:any) {
    console.log('MI HORA')
    console.log(Hour)

    const { loading, error, data } = useQuery(getServices);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
        console.error(error);
        return <div>Error!</div>;
    }

    var serviceOptions = data.obtenerServices.map(function(item:any) {
        return (
          <IonSelectOption key={item.id} value={item.id}> 
            {item.serviceName} ({item.duration} minutos)
          </IonSelectOption> 
        ); 
      }); 
    
    return (
        <div>
                <IonSelect value={serviceId} onIonChange={e => onChange("serviceId", e.detail.value)}>
                    <IonSelectOption value="">Servicio</IonSelectOption>
                    {serviceOptions}
                </IonSelect>
                <IonButton onClick={onRemove}>Eliminar</IonButton>
                {Date=='' || Hour==''
                ? <h3>Esperando</h3>
                : <Employees  value={employeeId} rows={rows} serviceId={serviceId} Date={Date} Hour={Hour} onChange={onChange}> </Employees>
                }
                
        </div>
    );
  }






const Services= (props:ServicesProps) => {

    const handleOnChange = (index:any, name:any, value:any) => {
        const copyRows = [...props.rows];
        
        copyRows[index] = {
        ...copyRows[index],
        [name]: value
        };
        if(name=='serviceId'){
          copyRows[index] = {
            ...copyRows[index],
            ['employeeId']: ""
          }

          let rows= props.rows.slice()

          rows.forEach((element:any,index:any) => {
            let n= index+1
            element['order']=n.toString()
          });

        }
        props.setRows(copyRows);

    };

    const handleOnAdd = () => {
        props.setRows(props.rows.concat(defaultState));
    };

    const handleOnRemove = (index:any) => {
        const copyRows = [...props.rows];
        copyRows.splice(index, 1);
        props.setRows(copyRows);
    };


    if(props.rows){
        return (
          
          <div  className="services">
            {props.rows.map((row, index) => (
              <RowServices
                {...row}
                onChange={(name:any, value:any) => handleOnChange(index, name, value)}
                onRemove={() => handleOnRemove(index)}
                key={index}
                Date={props.Date}
                Hour={props.Hour}
                rows={props.rows}
              />
            ))}
            <IonButton onClick={handleOnAdd}>Agregar</IonButton>
          </div>
          
        );
      }
      
      return (
          
          <div  className="services">
            <IonButton onClick={handleOnAdd}>Agregar</IonButton>
          </div>
          
        );
}

export default Services