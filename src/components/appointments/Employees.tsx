import { useQuery } from '@apollo/client';
import { getEmployeesByService } from '../../../routes/employees'
import {
    IonButton,
    IonSelect,
    IonSelectOption,
  } from '@ionic/react';
type BoxProps = {
    rows:any
    value:any
    serviceId:any
    Date:any
    Hour:any
    onChange:any
    children: React.ReactNode; // 👈️ type children
  };

const Employees = (props: BoxProps) => {

    const date= props.Date ? props.Date : '2023-13-1'
    const hour= props.Hour ? props.Hour : '2023-13-1'

    let fecha= new Date(date)
    let hora_minuto= hour.split(':');
    fecha.setHours(fecha.getHours()+parseInt(hora_minuto[0]));
    fecha.setMinutes(fecha.getMinutes()+parseInt(hora_minuto[1]));

    let rowtempEmployeeId:any=[]
    let rows= props.rows
    if(props.rows!==undefined){
      props.rows.forEach((element:any,index:any) => {
        let n= index+1
        element['order']=n.toString()
      });
  
      rows= props.rows.slice()
      // Copia
      rows.forEach((element:any) => {
        rowtempEmployeeId.push(element.employeeId)
        delete element.employeeId
      });
    }


    const { loading, error, data } = useQuery(getEmployeesByService,{
        variables:{
            token:props.serviceId,
            hour:fecha,
            services:rows
        }
      });



    if(props.rows!==undefined){
        // Copia
        rowtempEmployeeId.forEach((element:any,index:any) => {
          rows[index].employeeId = element
        });
      }
  
  
      if(isNaN(fecha.getTime()) || props.serviceId==''){
        return (<h1></h1>)
      }
  
  
      if (loading) {
          return <div>Loading...</div>;
      }
      if (error) {
          console.error(error);
          return <div>Error!</div>;
      }


    if(data.obtenerEmployeesByService==undefined){
        return(
            <IonSelect value={props.value} onChange={(e:any) => props.onChange("employeeId",e.target.value)}>
                <IonSelectOption >Estilista</IonSelectOption>
            </IonSelect>
        )
    }

    var employeeOptions = data.obtenerEmployeesByService.map(function(item:any) {

        return (
          <IonSelectOption key={item.id} value={item.id}> 
            {item.name}
          </IonSelectOption> 
        ); 
      }); 
    
    return (
        
        <IonSelect onChange={(e:any) => props.onChange("employeeId",e.target.value)}>
            <IonSelectOption >Estilista</IonSelectOption>
            {employeeOptions}
        </IonSelect>
        
      );

}


export default Employees;
