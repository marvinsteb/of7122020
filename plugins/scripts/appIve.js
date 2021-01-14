// templates

function templateInvalidTooltip(mensaje) {
  return `<div class="invalid-tooltip">${mensaje}</div>`;
}
function templateFormGroup(temFormGroup, tamanio) {
  let tm = $(`<div class="col-sm">
                    <div class="form-group">
                    </div>
                </div>`);
  if (tamanio != undefined) {
    $(tm).addClass(tamanio);
    $(tm).removeClass("col-sm");
  }
  $(tm).find("div.form-group").append(temFormGroup);
  return tm;
}
function templateInputText(
  id,
  tipo,
  tamanio,
  textolabel,
  requerido,
  deshabilitado
) {
  let tmNom = $(`<label>${textolabel} <span class="oculto">*</span></label>
                   <input name="${tipo}${id}" id="${tipo}${id}" type="text" class="form-control ${tipo}" placeholder="${textolabel} ..." maxlength="${tamanio}"/>`);
  tmNom = templateFormGroup(tmNom);
  if (requerido === true) {
    $(tmNom).find(`input#${tipo}${id}`).prop("required", true);
    $(tmNom).find(`label> span`).removeClass("oculto");
  }
  if (deshabilitado === true) {
    $(tmNom).find(`input#${tipo}${id}`).prop("disabled", true);
    $(tmNom).find(`label>span`).addClass("oculto");
  }
  return tmNom;
}
function templateCamposNommbres(id) {
  const priApe = templateInputText(
    id,
    "primerApellido",
    15,
    "Primer Apellido",
    true
  );
  const segApe = templateInputText(
    id,
    "segundoApellido",
    15,
    "Segundo Apellido"
  );

  let apeCa = templateInputText(id, "apellidoCasada", 15, "Apellido Casada");
  let tmInToltp = templateInvalidTooltip(
    "No debe anteponerse a la palabra “DE” al referirse al apellido de casada. Especificar únicamente el apellido."
  );
  $(apeCa).find("div.form-group").append(tmInToltp);
  validarApellidoCasada($(apeCa).find(`input#apellidoCasada${id}`));

  const priNom = templateInputText(
    id,
    "primerNombre",
    15,
    "Primer Nombre",
    true
  );
  const segNom = templateInputText(id, "segundoNombre", 15, "Segundo Nombre");
  const otNom = templateInputText(id, "otrosNombres", 30, "Otros Nombres");
  let rowNombres = $(` <div class="row"></div>`);
  $(rowNombres).append(priApe);
  $(rowNombres).append(segApe);
  $(rowNombres).append(apeCa);
  $(rowNombres).append(priNom);
  $(rowNombres).append(segNom);
  $(rowNombres).append(otNom);
  return rowNombres;
}
function templateSexo(id) {
  let templatesexo = $(`<label for="sexo${id}">Sexo <span>*</span></label>
                          <select name="sexo${id}" id="sexo${id}" class="form-control custom-select sexo select2" style="width: 100%" required>
                              <option value="" disabled selected>Selecciona</option>
                              <option value="M">Masculino</option>
                              <option value="F">Femenino</option>
                          </select>`);
  templatesexo = templateFormGroup(templatesexo);
  $(templatesexo).find("select").select2();
  return templatesexo;
}
function templateNit(id) {
  let temNit = $(`<label>Nit</label>
                    <input name="nit${id}" id="nit${id}" type="text" class="form-control nit" placeholder="Nit ..." maxlength="20" />`);
  temNit = templateFormGroup(temNit);
  validarNit($(temNit).find(`input#nit${id}`));
  return temNit;
}
function templateDoctoIdentificacion(id) {
  let temDoctoIdent = $(`<label for="tipoDoctoIdentificacion${id}">Docto. identificación <span>*</span></label>
                           <select name="tipoDoctoIdentificacion${id}" id="tipoDoctoIdentificacion${id}" class="form-control custom-select tipoDoctoIdentificacion validaPaisPasaporte select2" style="width: 100%" required>
                               <option value="" disabled selected>Selecciona</option>
                               <option value="D">DPI</option>
                               <option value="P">Pasaporte</option>
                           </select>`);
  temDoctoIdent = templateFormGroup(temDoctoIdent);
  $(temDoctoIdent).find(`select#tipoDoctoIdentificacion${id}`).select2();
  habilitaPaisPasaporte(
    $(temDoctoIdent).find(`select#tipoDoctoIdentificacion${id}`)
  );
  return temDoctoIdent;
}
function templateNumDocumento(id) {
  let temNumDoc = $(`<label>Número identificación <span>*</span></label>
                       <input name="noDocIdentificacion${id}" id="noDocIdentificacion${id}" type="text" class="form-control noDocIdentificacion" placeholder="Número identificación..." maxlength="20" required disabled/>`);
  temNumDoc = templateFormGroup(temNumDoc);
  return templateFormGroup(temNumDoc);
}
function templateProfecionOficio(id) {
  const temProfOfici = `<label>Profesión u oficio <span>*</span></label>
                          <input name="profecionOficio${id}" id="profecionOficio${id}" type="text" class="form-control profecionOficio" placeholder="Profesión u oficio ..." maxlength="100" required />`;
  return templateFormGroup(temProfOfici);
}
function templateEmail(id) {
  let temcorreo = `<label>Correo electrónico</label>
                     <input name="email${id}" id="email${id}" type="email" class="form-control email" placeholder="Correo electrónico ..." maxlength="100" />`;
  return templateFormGroup(temcorreo);
}
function templateEstadoCivil(id) {
  let temEs = $(`<label>Estado civil <span>*</span></label>
                 <select name="estadoCivil${id}" id="estadoCivil${id}" class="form-control custom-select estadoCivil select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="S">Soltero</option>
                    <option value="C">Casado</option>
                 </select>`);
  temEs = templateFormGroup(temEs);
  $(temEs).find("select").select2();
  return temEs;
}
function templatePais(
  id,
  textolabel,
  desabilitadeptomuni,
  clasesAdicionales = "",
  deshabilitado = false
) {
  let claseDeptoMuni = "";
  if (desabilitadeptomuni == true) {
    claseDeptoMuni = "deshabilitaDepartamentoMunicipio";
  }
  selectDesabilitado = "";
  if (deshabilitado == true) {
    selectDesabilitado = "disabled";
  }
  let templatepais = $(`<label for="${id}">${textolabel} <span>*</span></label>
                        <select name="${id}" id="${id}" class="form-control custom-select pais ${claseDeptoMuni} setPais ${clasesAdicionales} select2" style="width: 100%" required ${selectDesabilitado}>
                        <option value="" disabled selected>Selecciona</option>
                        </select>`);

  templatepais = templateFormGroup(templatepais);
  const selectPais = $(templatepais).find(`select#${id}`);
  cargarPais(selectPais);
  $(selectPais).select2();
  if (desabilitadeptomuni == true) {
    habilitaDepartamentoMunicipio(selectPais);
  }

  return templatepais;
}
function templateDepartamento(id, textolabel) {
  let cmDpto = $(` <label>${textolabel} <span class="oculto">*</span></label>
                            <select name="depto${id}" id="depto${id}" class="form-control custom-select depto getMunicipio setDepartamento select2" style="width: 100%" required disabled>
                                <option value="" disabled selected>Selecciona</option>
                            </select>`);
  cmDpto = templateFormGroup(cmDpto);
  const dpto = $(cmDpto).find(`select#depto${id}`);
  cargarDepartamentos(dpto);
  $(cmDpto).find(`select#depto${id}`).select2();
  return cmDpto;
}
function templateMunicipio(id, textolabel) {
  let cmMuni = $(`<label>${textolabel} <span class="oculto">*</span></label>
                        <select name="muni${id}" id="muni${id}" class="form-control custom-select muni setMunicipio select2" style="width: 100%" required disabled>
                            <option value="" disabled selected>Selecciona</option>
                        </select>`);
  cmMuni = templateFormGroup(cmMuni);
  $(cmMuni).find(`select#muni${id}`).select2();
  return cmMuni;
}
function templateCondicionMigratoria(id) {
  let cmCond = $(`<label>Condición migratoria <span class="oculto">*</span></label>
                    <select name="condicionMigratoria${id}" id="condicionMigratoria${id}" class="form-control custom-select condicionMigratoria select2" style="width: 100%" disabled required>
                    <option value="" disabled selected>Selecciona</option>
                    </select>`);
  cmCond = templateFormGroup(cmCond);
  $(cmCond).find("select").select2();
  return cmCond;
}
function templateOtraCondicionMigratoria(id) {
  let cmOtraCM = templateFormGroup(`
                     <label>Especifique <span class="oculto">*</span></label>
                     <input name="otraCoMi${id}" id="otraCoMi${id}" type="text" class="form-control otraCoMi" placeholder="Otra condición migratoria ..." maxlength="100" disabled required />`);
  return cmOtraCM;
}
function templateFecha(id, nombre, textolabel, tamanio, requerido) {
  let temCampoFecha = $(`<label>Fecha ${textolabel} <span>*</span></label>
                        <div class="input-group date" id="fecha${nombre}_${id}" data-target-input="nearest">
                            <input name="fecha${nombre}${id}" id="fecha${nombre}${id}" type="text" class="form-control ${nombre} datetimepicker-input" data-target="#fecha${nombre}_${id}" required />
                            <div class="invalid-tooltip">Ingresa una fecha correcta, no se permite una fecha mayor a la fecha actual</div>
                            <div class="input-group-append" data-target="#fecha${nombre}_${id}" data-toggle="datetimepicker">
                                <div class="input-group-text">
                                    <i class="fa fa-calendar"></i>
                                </div>
                            </div>
                        </div>`);
  let cm = templateFormGroup(temCampoFecha, tamanio);
  if (requerido === false) {
    $(cm).find(`input#fecha${nombre}${id}`).prop("required", false);
    $(cm).find(`label>span`).addClass("oculto", false);
  }
  setFormatoFecha($(cm).find("div.date"));
  return cm;
}
function templateNacionalidad(id) {
  let temNacionalidad = $(`
        <div class="col-sm" id="nacionalidad${id}" cantidad="1">
            <div class="form-group">
                <div class="row">
                    <div class="col-sm">
                        <label>Nacionalidad <span>*</span></label>
                        <select name="nacionalidad${id}" id="nacionalidad${id}_1" class="form-control custom-select nacionalidad select2" style="width: 100%" required>
                            <option value="" disabled selected>Selecciona</option>
                        </select>
                    </div>
                    <div class="col-sm my-auto pt-2"></div>
                </div>
            </div>
            <div class="form-group">
                <button type="button" id="agregarNacionalidad${id}" class="btn btn-primary agregarNacionalidad">Agregar Nacionalidad</button>
            </div>
        </div>`);
  const btnAgregar = $(temNacionalidad).find(`button#agregarNacionalidad${id}`);
  let selectNacionalidadpais = $(temNacionalidad).find(
    `select#nacionalidad${id}_1`
  );
  $(selectNacionalidadpais).select2();
  cargarPais(selectNacionalidadpais);
  agregarTemplateNacionalidad(btnAgregar);
  return temNacionalidad;
}
function templateTelefono(id, agregarBtnBorrar) {
  let btnBorrar = "";
  if (agregarBtnBorrar) {
    btnBorrar = `<button type="button" class="btn btn-danger">Borrar</button>`;
  }
  let tmTelefono = $(`
        <div class="form-group">
            <div class="row">
                <div class="col-sm">
                    <input name="${id}" id="${id}" type="text" class="form-control telefono" placeholder="telefono ..." maxlength="30" required />
                </div>
                <div class="col-sm">${btnBorrar}</div>
            </div>
        </div>`);
  return tmTelefono;
}
function templateContenedorTelefonos(id) {
  let cmTel = templateTelefono(`telefono${id}_1`, false);
  let temTelefono = $(`
    <div class="col-sm" id="telefono${id}" cantidad="1">
        <label>Teléfonos <span>*</span></label>
        <div class="form-group">
            <button type="button" id="agregarTelefono${id}" class="btn btn-primary agregarTelefono">Agregar teléfono</button>
        </div>
    </div>`);
  $(temTelefono).children().last().before(cmTel);
  let btnTelefono = $(temTelefono).find(`button#agregarTelefono${id}`);
  agregarTemplateTelefono(btnTelefono);
  return temTelefono;
}
// div row
function templateCamposNacimiento(id) {
  //fechaNacimiento
  let cmFechaNacimiento = templateFecha(id, "Nacimiento", "nacimiento");
  let cmPaisNacimiento = templatePais(
    `paisNacimiento${id}`,
    "País nacimiento",
    true
  );
  let cmDepartamentoNacimiento = templateDepartamento(
    `Nacimiento${id}`,
    "Depto. nacimiento"
  );
  let cmMunicipio = templateMunicipio(
    `Nacimiento${id}`,
    "Municipio nacimiento"
  );
  let cmCondicionMigratoria = templateCondicionMigratoria(id);
  let cmOtraCondicionM = templateOtraCondicionMigratoria(id);
  let temCampoNac = $(`<div class="row"></div>`);
  $(temCampoNac).append(cmFechaNacimiento);
  $(temCampoNac).append(cmPaisNacimiento);
  $(temCampoNac).append(cmDepartamentoNacimiento);
  $(temCampoNac).append(cmMunicipio);
  $(temCampoNac).append(cmCondicionMigratoria);
  $(temCampoNac).append(cmOtraCondicionM);
  return temCampoNac;
}
function templateCamposResidencia(id) {
  let comPais = templatePais(`paisRecidencia${id}`, "País residencia", true);
  let comDepartamento = templateDepartamento(
    `Recidencia${id}`,
    "Departamento residencia"
  );
  let comMunicipio = templateMunicipio(
    `Recidencia${id}`,
    "Municipio residencia"
  );
  let tempCamResidencia = $(`<div class="row"></div>`);
  $(tempCamResidencia).append(comPais);
  $(tempCamResidencia).append(comDepartamento);
  $(tempCamResidencia).append(comMunicipio);
  return tempCamResidencia;
}
function templateCamposDocumentos(id) {
  let comSexo = templateSexo(id);
  let comEstadoCivil = templateEstadoCivil(id);
  let comNit = templateNit(id);
  let comDocIdentificacion = templateDoctoIdentificacion(id);
  let comNumDoctoIdentifica = templateNumDocumento(id);
  let paisPasaporte = templatePais(
    `emicionPasaporte${id}`,
    "País (Pasaporte)",
    false,
    "emicionPasaporte",
    true
  );
  let temCamDoc = $(`<div class="row"></div>`);
  $(temCamDoc).append(comSexo);
  $(temCamDoc).append(comEstadoCivil);
  $(temCamDoc).append(comNit);
  $(temCamDoc).append(comDocIdentificacion);
  $(temCamDoc).append(comNumDoctoIdentifica);
  $(temCamDoc).append(paisPasaporte);
  return temCamDoc;
}
function templateCamposProfecion(id) {
  let comProfOficio = templateProfecionOficio(id);
  let comEmail = templateEmail(id);
  let temCamposProf = $(`<div class="row"></div>`);
  $(temCamposProf).append(comProfOficio);
  $(temCamposProf).append(comEmail);
  return temCamposProf;
}
function templateDireccion(id, textolabel, tipo) {
  let temDirec = $(`
        <div class="row">
            <div class="col-sm">
                <label>${textolabel} <span>*</span></label>
                <input name="direccion${tipo}${id}" id="direccion${tipo}${id}" type="text" class="form-control direccion" placeholder="Dirección..." maxlength="400" required />
            </div>
        </div>`);
  return temDirec;
}
function templateCamposNacionalidadTelefono(id) {
  let cmNacionalidad = templateNacionalidad(id);
  let cmTelefono = templateContenedorTelefonos(id);
  let temCNT = $(`<div class="row"></div>`);
  $(temCNT).append(cmNacionalidad);
  $(temCNT).append(cmTelefono);
  return temCNT;
}
function templateCpe(id) {
  let temCpe = $(`
        <div class="row">
            <div class="col-sm-6">
                <div class="form-check">
                    <div><label>¿El cliente es Contratista y Proveedor del Estado (CPE)? <span>*</span></label></div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="cpeSi${id}" class="cpe form-check-input" name="cpe${id}" value="S" required />
                        <label for="cpeSi${id}">Sí</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="cpeNo${id}" class="cpe form-check-input" name="cpe${id}" value="N" required />
                        <label for="cpeNo${id}">No</label>
                        <div class="invalid-tooltip">Indica si el cliente es CPE.</div>
                    </div>
                </div>
            </div>
        </div>`);
  return temCpe;
}
function templateAsoPep(id) {
  let temAsoPep = $(`
        <div class="row">
            <div class="col-sm">
                <div class="form-check">
                    <div>
                        <label>¿El cliente tiene parentesco o es asociado cercano a una Persona Expuesta Políticamente (PEP)? <span>*</span></label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="primaryAsoPepSi${id}" class="asoPep form-check-input" name="asoPep${id}" value="S" required />
                        <label for="primaryAsoPepSi${id}">Sí</label>
                    </div>
                    <div class="icheck-primary d-inline">
                        <input type="radio" id="primaryAsoPepNo${id}" class="asoPep form-check-input" name="asoPep${id}" value="N" required />
                        <label for="primaryAsoPepNo${id}">No</label>
                        <div class="invalid-tooltip">Indica si el cliente tine un tiene parentesco o es asociadoa una Persona PEP.</div>
                    </div>
                </div>
            </div>
        </div>

        <div id="datosasoPep${id}">
             <div class="info" cantidad="0">
            </div>
            <div class="btnadd">
            </div>
        </div>
    `);
  verificarAsoPep($(temAsoPep).find(`input.asoPep`));
  return temAsoPep;
}
function templatePersonaPep(id) {
  let temPersonaPep = $(`
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-check">
                        <div><label>¿El cliente es una Persona Expuesta Políticamente (PEP)? <span>*</span></label></div>
                        <div class="icheck-primary d-inline">
                            <input type="radio" id="pepSi${id}" class="pep form-check-input" name="pep${id}" value="S" required />
                            <label for="pepSi${id}">Sí</label>
                        </div>
                        <div class="icheck-primary d-inline">
                            <input type="radio" id="pepNo${id}" class="pep form-check-input" name="pep${id}" value="N" required />
                            <label for="pepNo${id}">No</label>
                            <div class="invalid-tooltip">Indica si el cliente es PEP.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datospep${id}"></div>`);
  verificarPersonaPep($(temPersonaPep).find(`input.pep`));
  return temPersonaPep;
}
function templateMontoIngresos(id) {
  let tmMontoIngresos = $(` <div class="row"></div>`);
  let labelMontoIngresos = $(
    `<label for="montoIngresos${id}" class = "d-inline">Monto mensual aproximado de los ingresos considerando todas las actividades económicas a las que se dedica (monto en quetzales) <span>*</span></label>`
  );
  labelMontoIngresos = templateFormGroup(labelMontoIngresos, "col-sm-9");
  let inputMontoIngresos = $(
    `<input type="number" name = "montoIngresos" id="montoIngresos${id}" class="form-control d-inline" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>`
  );
  inputMontoIngresos = templateFormGroup(inputMontoIngresos, "col-sm-3");
  $(tmMontoIngresos).append(labelMontoIngresos);
  $(tmMontoIngresos).append(inputMontoIngresos);
  return tmMontoIngresos;
}
function templatePropositoRc(id) {
  let tempPropositoRc = $(`<div class="row"></div>`);
  const tmPrc = `<label for="propositoRC${id}">Propósito de la relación de negocios <span>*</span></label>
                   <input name="propositoRC" id="propositoRC${id}" type="text" class="form-control" placeholder="Propósito de la relación de negocios..." maxlength="400" required />`;
  $(tempPropositoRc).append(templateFormGroup(tmPrc));
  return tempPropositoRc;
}
function templateDatosIngresos(id) {
  let btn = $(` <div class="row">
                        <div class="form-group">
                            <button type="button" id="agregarFuenteIngresos${id}" class="btn btn-primary agregarFuenteIngresos">Agregar fuente de ingresos</button>
                        </div>
                    </div>`);
  const btnfing = $(btn).find(`button#agregarFuenteIngresos${id}`);
  agregarTemplateFuenteIngresos(btnfing);
  let tmIng = $(`
                    <div id="datosfuenteingresos${id}">
                        <div class="row">
                            <div class="col-sm">
                                <div class="form-group">
                                    <label for="">Fuente de ingresos <span>*</span></label>
                                </div>
                            </div>
                        </div>
                        <div id="fuenteingresos${id}" cantidad = "0" idinput= ""></div>
                    </div>`);
  $(tmIng).append(btn);

  const tmCFi = templateCamposFuenteIngreso(`fuenteingresos${id}`, 0);
  $(tmIng).find(`div#fuenteingresos${id}`).append(tmCFi);
  return tmIng;
}
function templateInformacionEconomicaInicial(id) {
  const coMonto = templateMontoIngresos(id);
  const cmRc = templatePropositoRc(id);
  let cmDatosFuenteingreso = templateDatosIngresos(id);
  let tmInfoEcoInicial = $(`<div class="card card-info mt-3">
                                <div class="card-header">
                                    <h3 class="card-title">Información económica del cliente</h3>
                                    <div class="card-tools">
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                </div>
                            </div>`);
  $(tmInfoEcoInicial).find("div.card-body").append(coMonto);
  $(tmInfoEcoInicial).find("div.card-body").append(cmRc);
  $(tmInfoEcoInicial).find("div.card-body").append(cmDatosFuenteingreso);
  return tmInfoEcoInicial;
}
function templateDatosPersonales(id, tipo) {
  let tcamposNombres = templateCamposNommbres(id);
  let tcamposNacimiento = templateCamposNacimiento(id);
  let tCamposDoc = templateCamposDocumentos(id);
  let tCamposProf = templateCamposProfecion(id);
  let tCampoDireccion = templateDireccion(
    id,
    "Dirección de residencia completa (calle o avenida, número de casa, colonia, sector, lote, manzana, otros)",
    "Recidencia"
  );
  let tCamposResidencia = templateCamposResidencia(id);
  let tCamposNumTel = templateCamposNacionalidadTelefono(id);
  let tCpe = templateCpe(id);
  let tPep = templatePersonaPep(id);
  let tAsoPep = templateAsoPep(id);
  let tcamposMinimos = $(`
    <div class="card card-info mt-3" id="${id}">
        <div class="card-header">
            <h3 class="card-title">Información del ${tipo}</h3>
            <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="card-body">
        </div>
     </div>`);
  let divCardBody = $(tcamposMinimos).find("div.card-body");
  $(divCardBody).append(tcamposNombres);
  $(divCardBody).append(tcamposNacimiento);
  $(divCardBody).append(tCamposDoc);
  $(divCardBody).append(tCamposProf);
  $(divCardBody).append(tCampoDireccion);
  $(divCardBody).append(tCamposResidencia);
  $(divCardBody).append(tCamposNumTel);
  $(divCardBody).append(tCpe);
  $(divCardBody).append(tPep);
  $(divCardBody).append(tAsoPep);
  return tcamposMinimos;
}
function borrarTemplateFuenteIngresos(temFeIg) {
  $(temFeIg)
    .find("button")
    .click(function () {
      console.log("eliminando fuente de ingresos");
      console.log($(this).parent().parent().parent().parent().remove());
    });
}
function templateCamposFuenteIngreso(id, posicion) {
  let temFeIg = $(`
    <div class="row">
        <div class="col-sm-2">
            <div class="form-group">
                <select name="select" id="select${id}_${posicion}" class="form-control custom-select select2 fuenteIngresos" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="NP">Negocio propio</option>
                    <option value="RD">Relación de dependencia</option>
                    <option value="OI">Otras fuentes de ingreso</option>
                </select>
            </div>
        </div>
        <div class="col-sm">
            <div class="form-group row">
                    <div class="col-sm-2">
                        <label for="input${id}_${posicion}" id="label${id}_${posicion}"></label>
                    </div>
                    <div class="col-sm ml-2">
                        <input name="input" id="input${id}_${posicion}" type="text" class="form-control" required disabled />
                    </div>
                    <div class="col-sm-1 borrarFuenteIngreso" >
                        <button type="button" class="btn btn-danger">Borrar</button>
                    </div>
            </div>
        </div>
    </div>`);
  $(temFeIg).find(`select#select${id}_${posicion}`).select2();
  const selectFuenteIngresos = $(temFeIg).find(
    `select#select${id}_${posicion}`
  );
  validarTipoFuenteIngreso(selectFuenteIngresos);
  if (posicion === 0) {
    $(temFeIg).find("button").remove();
  } else {
    let divborrar = $(temFeIg).find(`div.borrarFuenteIngreso`);
    borrarTemplateFuenteIngresos(divborrar);
  }
  return temFeIg;
}
function templateFilaUnoProductoServicio(id) {
  const cmFechaProducto = templateFecha(`_${id}`, "ProductoServicio", "");
  const pais = templatePais(
    `paisProductoServicio_${id}`,
    "País en donde se contrata el producto/servicio",
    true,
    "",
    false
  );
  const departamento = templateDepartamento(
    `ProductoServicio_${id}`,
    "Departamento"
  );
  const municipio = templateMunicipio(`ProductoServicio_${id}`, "Municipio");
  let tm = $(`<div class="row"></div>`);
  $(tm).append(cmFechaProducto);
  $(tm).append(pais);
  $(tm).append(departamento);
  $(tm).append(municipio);
  return tm;
}
function templateFilaDosProductoServicio(id) {
  const cmIdentificador = templateInputText(
    id,
    "identificadorProductoServicio_",
    50,
    "Identificador producto y/o servicio",
    false
  );
  const cmtipoPS = templateInputText(
    id,
    "tipoProductoServicio_",
    100,
    "Tipo producto y/o servicio",
    true
  );
  const cmNombrePs = templateInputText(
    id,
    "nombreProductoServicio_",
    300,
    "Nombre producto y/o servicio",
    false
  );
  let tm = $(`<div class="row"></div>`);
  $(tm).append(cmIdentificador);
  $(tm).append(cmtipoPS);
  $(tm).append(cmNombrePs);
  return tm;
}
function templateFilaTresProductoServicio(id) {
  const descripcion = templateInputText(
    id,
    "descripcionProductoServicio_",
    600,
    "Descripción producto y/o servicio",
    true
  );
  let tm = $(`<div class="row"></div>`);
  tm = $(tm).append(descripcion);
  return tm;
}
function templateFilaCuatroProductoServicio(id) {
  const nombreContrata = templateInputText(
    id,
    "nombreContrataProductoServicio_",
    400,
    "A nombre de quién se contrata el producto y/o servicio",
    true
  );
  let tm = $(`<div class="row"></div>`);
  tm = $(tm).append(nombreContrata);
  return tm;
}
function templateMoneda(id) {
  let moneda = $(`<label for="moneda${id}">Moneda <span>*</span></label>
                    <select name="moneda" class="form-control custom-select moneda select2" style="width: 100%" required></select>`);
  moneda = templateFormGroup(moneda, "col-sm-3");
  let selectMoneda = $(moneda).find("select.moneda");
  $(selectMoneda).select2();
  cargarMoneda(selectMoneda);
  return moneda;
}
function templateValor(id) {
  const valor = $(`<label for="valor${id}">Valor producto y/o servicio <span>*</span></label>
                     <input type="number" name = "valor" id="valor${id}" class="form-control valor" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>`);
  return templateFormGroup(valor, "col-sm-3");
}
function templateFilaCincoProductoServicio(id) {
  const moneda = templateMoneda(`ProductoServicio_${id}`);
  const valor = templateValor(`ProductoServicio_${id}`);
  let tm = $(`<div class="row"></div>`);
  tm = $(tm).append(moneda);
  tm = $(tm).append(valor);
  return tm;
}
function btnAgregarBeneficiario(btn) {
  $(btn).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("agregando beneficiario");
    const id = $(this).parent().parent().parent().parent().attr("id");
    agregarCamposMinimos("Beneficiario", `div#datosBeneficiario${id}`);
  });
}
function templateBeneficiario(id) {
  let tmB = $(
    `<div class="row"><H2>Beneficiarios </h2><div id="datosBeneficiarioProductoServicio_${id}"  class="col-sm-12" cantidad="0" ></div></div>`
  );
  let divBtn = $(`<div class="col-sm form-group">
                           <button type="button" id="agregarBeneficiario${id}" class="btn btn-primary agregarBeneficiario">Agregar Beneficiario</button>
                       </div>`);
  const btn = $(divBtn).find(`button#agregarBeneficiario${id}`);
  btnAgregarBeneficiario(btn);
  $(tmB).append(divBtn);
  return tmB;
}
function btnAgregarOtroFirmantes(btn) {
  $(btn).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const id = $(this).parent().parent().parent().parent().attr("id");
    agregarCamposMinimos("OtrosFirmantes", `div#datosOtrosFirmantes${id}`);
  });
}
function templateOtrosFirmantes(id) {
  let tmB = $(
    `<div class="row"><H2>Otros Firmantes </h2><div id="datosOtrosFirmantesProductoServicio_${id}"  class="col-sm-12" cantidad="0" ></div></div>`
  );
  let divBtn = $(`<div class="col-sm form-group">
                           <button type="button" id="agregarOtrosFirmantes${id}" class="btn btn-primary agregarOtrosFirmantes">Agregar Otros Firmantes</button>
                       </div>`);
  const btn = $(divBtn).find(`button#agregarOtrosFirmantes${id}`);
  btnAgregarOtroFirmantes(btn);
  $(tmB).append(divBtn);
  return tmB;
}

function templateProductoServicio(id) {
  const rowUno = templateFilaUnoProductoServicio(id);
  const rowDos = templateFilaDosProductoServicio(id);
  const rowTres = templateFilaTresProductoServicio(id);
  const rowCuatro = templateFilaCuatroProductoServicio(id);
  const rowCinco = templateFilaCincoProductoServicio(id);
  const rowSeis = templateBeneficiario(id);
  let rowSiete = templateOtrosFirmantes(id);
  let tm = $(`
                <div class="card card-info mt-3" id="ProductoServicio_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Producto o servicio ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
  $(tm).find("div.card-body").append(rowUno);
  $(tm).find("div.card-body").append(rowDos);
  $(tm).find("div.card-body").append(rowTres);
  $(tm).find("div.card-body").append(rowCuatro);
  $(tm).find("div.card-body").append(rowCinco);
  $(tm).find("div.card-body").append(rowSeis);
  $(tm).find("div.card-body").append(rowSiete);
  eliminarCard($(tm));
  return tm;
}
// agrega template campos minimos con los eventos, y verificaciones
function agregarDatosPersonales(divDatos, idCamposMinimos, tipo) {
  console.log(`agregado informacion del  ${idCamposMinimos}`);
  let templateRepresentante = templateDatosPersonales(idCamposMinimos, tipo);
  $(divDatos).append(templateRepresentante);
}

// funciones para configuracion del formulario
function setFormatoFecha(divInputFecha) {
  for (let i = 0; i < divInputFecha.length; i++) {
    $(divInputFecha[i]).datetimepicker({ format: "DD/MM/YYYY" });
    let inputFecha = $(divInputFecha[i]).find("input");
    $(inputFecha).on("focusout", function (event) {
      event.preventDefault();
      event.stopPropagation();
      let hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      let fechaString = $(this).val();

      let dateMomentObject = moment(fechaString, "DD/MM/YYYY");
      let fechaActual = dateMomentObject.toDate();
      if (fechaActual <= hoy) {
        $(this).removeClass("is-invalid");
      } else {
        $(this).val(null);
        $(this).addClass("is-invalid");
      }
    });
  }
}
function verificaActuaNombrePropio(elementoActuaNomprePropio) {
  for (let i = 0; i < elementoActuaNomprePropio.length; i++) {
    $(elementoActuaNomprePropio[i]).change(function () {
      let tipo = $(this)
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .parent()
        .attr("id");
      console.log(tipo);
      let divDatosRepresentante = $(`div#representante${tipo}`);
      let inputCalidadActua = $(`input#calidadActua${tipo}`);
      if (this.value === "C") {
        inputCalidadActua[0].disabled = true;
        $(inputCalidadActua[0]).val(null);
        $(inputCalidadActua[0]).prop("required", false);
        $(inputCalidadActua[0]).parent().find("label>span").addClass("oculto");
        $(divDatosRepresentante).children().remove();
      } else if (this.value === "R") {
        inputCalidadActua[0].disabled = false;
        $(inputCalidadActua[0]).prop("required", true);
        $(inputCalidadActua[0])
          .parent()
          .find("label>span.oculto")
          .removeClass("oculto");
        agregarDatosPersonales(
          divDatosRepresentante,
          `Representante${tipo}`,
          "representante"
        );
      }
    });
  }
}
function habilitaDepartamentoMunicipio(selectPais) {
  for (let i = 0; i < selectPais.length; i++) {
    $(selectPais[i]).change(function () {
      let divPadre = $(this).parent().parent().parent();
      let selectCondicionMig = $(divPadre).find("select.condicionMigratoria");
      let otraCondicionMigratoria = $(divPadre).find("input.otraCoMi");
      let departamento = $(divPadre).find("select.getMunicipio");
      let municipio = $(divPadre).find("select.setMunicipio");
      if (this.value == 1) {
        departamento[0].disabled = false;
        $(departamento[0]).parent().find("label>span").removeClass("oculto");
        // verifica si existe el campo CondicionMigratoria
        if (selectCondicionMig.length) {
          $(selectCondicionMig).prop("disabled", true);
          $(selectCondicionMig).parent().find("label>span").addClass("oculto");
          $(selectCondicionMig).empty();
          $(selectCondicionMig).append(
            '<option value="" disabled selected>Selecciona</option>'
          );
          $(otraCondicionMigratoria).prop("disabled", true);
          $(otraCondicionMigratoria)
            .parent()
            .find("label>span")
            .addClass("oculto");
          $(otraCondicionMigratoria).val(null);
        }
      } else {
        departamento[0].disabled = true;
        $(departamento[0]).parent().find("label>span").addClass("oculto");
        cargarDepartamentos($(departamento[0]));
        municipio[0].disabled = true;
        $(municipio[0]).empty();
        $(municipio[0]).parent().find("label>span").addClass("oculto");
        $(municipio[0]).append(
          '<option value="" disabled selected>Selecciona</option>'
        );
        if (selectCondicionMig.length) {
          $(selectCondicionMig).prop("disabled", false);
          $(selectCondicionMig)
            .parent()
            .find("label>span")
            .removeClass("oculto");
          cargarCondicionMigratoria($(selectCondicionMig));
        }
      }
    });
  }
}
function cargarMunicipios(selectDeptos) {
  for (let i = 0; i < selectDeptos.length; i++) {
    $(selectDeptos[i]).change(function (event) {
      let selectMuniActual = $(this)
        .parent()
        .parent()
        .parent()
        .find("select.setMunicipio");
      selectMuniActual[0].disabled = true;
      $(selectMuniActual[0]).parent().find("label>span").removeClass("oculto");
      $(selectMuniActual[0]).empty();
      $(selectMuniActual[0]).append(
        '<option value="" disabled selected>Selecciona</option>'
      );
      $(selectMuniActual[0]).append(
        `<option value="1">GUATEMALA</option>
<option value="2">SANTA CATARINA PINULA</option>
<option value="3">SAN JOSÉ PINULA</option>
<option value="4">SAN JOSÉ DEL GOLFO</option>
<option value="5">PALENCIA</option>
<option value="6">CHINAUTLA</option>
<option value="7">SAN PEDRO AYAMPUC</option>
<option value="8">MIXCO</option>
<option value="9">SAN PEDRO SACATEPÉQUEZ</option>
<option value="10">SAN JUAN SACATEPÉQUEZ</option>
<option value="11">SAN RAYMUNDO</option>
<option value="12">CHUARRANCHO</option>
<option value="13">FRAIJANES</option>
<option value="14">AMATITLÁN</option>
<option value="15">VILLA NUEVA</option>
<option value="16">VILLA CANALES</option>
<option value="17">SAN MIGUEL PETAPA</option>
<option value="18">GUASTATOYA</option>
<option value="19">MORAZÁN</option>
<option value="20">SAN AGUSTÍN ACASAGUASTLÁN</option>
<option value="21">SAN CRISTÓBAL ACASAGUASTLÁN</option>
<option value="22">EL JÍCARO</option>
<option value="23">SANSARE</option>
<option value="24">SANARATE</option>
<option value="25">SAN ANTONIO LA PAZ</option>
<option value="26">ANTIGUA GUATEMALA</option>
<option value="27">JOCOTENANGO</option>
<option value="28">PASTORES</option>
<option value="29">SUMPANGO</option>
<option value="30">SANTO DOMINGO XENACOJ</option>
<option value="31">SANTIAGO SACATEPEQUÉZ</option>
<option value="32">SAN BARTOLOMÉ MILPAS ALTAS</option>
<option value="33">SAN LUCAS SACATEPÉQUEZ</option>
<option value="34">SANTA LUCÍA MILPAS ALTAS</option>
<option value="35">MAGDALENA MILPAS ALTAS</option>
<option value="36">SANTA MARÍA DE JESÚS</option>
<option value="37">CIUDAD VIEJA</option>
<option value="38">SAN MIGUEL DUEÑAS</option>
<option value="39">ALOTENANGO</option>
<option value="40">SAN ANTONIO AGUAS CALIENTES</option>
<option value="41">SANTA CATARINA BARAHONA</option>
<option value="42">CHIMALTENANGO</option>
<option value="43">SAN JOSÉ POAQUIL</option>
<option value="44">SAN MARTÍN JILOTEPEQUE</option>
<option value="45">SAN JUAN COMALAPA</option>
<option value="46">SANTA APOLONIA</option>
<option value="47">TECPÁN GUATEMALA</option>
<option value="48">PATZÚN</option>
<option value="49">POCHUTA</option>
<option value="50">PATZICÍA</option>
<option value="51">SANTA CRUZ BALANYA</option>
<option value="52">ACATENANGO</option>
<option value="53">SAN PEDRO YEPOCAPA</option>
<option value="54">SAN ANDRÉS ITZAPA</option>
<option value="55">PARRAMOS</option>
<option value="56">ZARAGOZA</option>
<option value="57">EL TEJAR</option>
<option value="58">ESCUINTLA</option>
<option value="59">SANTA LUCÍA COTZUMALGUAPA</option>
<option value="60">LA DEMOCRACIA</option>
<option value="61">SIQUINALÁ</option>
<option value="62">MASAGUA</option>
<option value="63">TIQUISATE</option>
<option value="64">LA GOMERA</option>
<option value="65">GUANAGAZAPA</option>
<option value="66">PUERTO SAN JOSÉ</option>
<option value="67">IZTAPA</option>
<option value="68">PALÍN</option>
<option value="69">SAN VICENTE PACAYA</option>
<option value="70">NUEVA CONCEPCIÓN</option>
<option value="71">SIPACATE</option>
<option value="72">CUILAPA</option>
<option value="73">BARBERENA</option>
<option value="74">SANTA ROSA DE LIMA</option>
<option value="75">CASILLAS</option>
<option value="76">SAN RAFAEL LAS FLORES</option>
<option value="77">ORATORIO</option>
<option value="78">SAN JUAN TECUACO</option>
<option value="79">CHIQUIMULILLA</option>
<option value="80">TAXISCO</option>
<option value="81">SANTA MARÍA IXHUATÁN</option>
<option value="82">GUAZACAPÁN</option>
<option value="83">SANTA CRUZ NARANJO</option>
<option value="84">PUEBLO NUEVO VIÑAS</option>
<option value="85">NUEVA SANTA ROSA</option>
<option value="86">SOLOLÁ</option>
<option value="87">SAN JOSÉ CHACAYÁ</option>
<option value="88">SANTA MARÍA VISITACIÓN</option>
<option value="89">SANTA LUCÍA UTATLÁN</option>
<option value="90">NAHUALÁ</option>
<option value="91">SANTA CATARINA IXTAHUACÁN</option>
<option value="92">SANTA CLARA LA LAGUNA</option>
<option value="93">CONCEPCIÓN</option>
<option value="94">SAN ANDRÉS SEMETABAJ</option>
<option value="95">PANAJACHEL</option>
<option value="96">SANTA CATARINA PALOPÓ</option>
<option value="97">SAN ANTONIO PALOPÓ</option>
<option value="98">SAN LUCAS TOLIMÁN</option>
<option value="99">SANTA CRUZ LA LAGUNA</option>
<option value="100">SAN PABLO LA LAGUNA</option>
<option value="101">SAN MARCOS LA LAGUNA</option>
<option value="102">SAN JUAN LA LAGUNA</option>
<option value="103">SAN PEDRO LA LAGUNA</option>
<option value="104">SANTIAGO ATITLÁN</option>
<option value="105">TOTONICAPÁN</option>
<option value="106">SAN CRISTÓBAL TOTONICAPÁN</option>
<option value="107">SAN FRANCISCO EL ALTO</option>
<option value="108">SAN ANDRÉS XECUL</option>
<option value="109">MOMOSTENANGO</option>
<option value="110">SANTA MARÍA CHIQUIMULA</option>
<option value="111">SANTA LUCÍA LA REFORMA</option>
<option value="112">SAN BARTOLO</option>
<option value="113">QUETZALTENANGO</option>
<option value="114">SALCAJÁ</option>
<option value="115">OLINTEPEQUE</option>
<option value="116">SAN CARLOS SIJA</option>
<option value="117">SIBILIA</option>
<option value="118">CABRICÁN</option>
<option value="119">CAJOLA</option>
<option value="120">SAN MIGUEL SIGUILA</option>
<option value="121">SAN JUAN OSTUNCALCO</option>
<option value="122">SAN MATEO</option>
<option value="123">CONCEPCIÓN CHIQUIRICHAPA</option>
<option value="124">SAN MARTÍN SACATEPÉQUEZ</option>
<option value="125">ALMOLONGA</option>
<option value="126">CANTEL</option>
<option value="127">HUITÁN</option>
<option value="128">ZUNIL</option>
<option value="129">COLOMBA</option>
<option value="130">SAN FRANCISCO LA UNIÓN</option>
<option value="131">EL PALMAR</option>
<option value="132">COATEPEQUE</option>
<option value="133">GÉNOVA COSTA CUCA</option>
<option value="134">FLORES</option>
<option value="135">LA ESPERANZA</option>
<option value="136">PALESTINA DE LOS ALTOS</option>
<option value="137">MAZATENANGO</option>
<option value="138">CUYOTENANGO</option>
<option value="139">SAN FRANCISCO ZAPOTITLÁN</option>
<option value="140">SAN BERNARDINO</option>
<option value="141">SAN JOSÉ EL ÍDOLO</option>
<option value="142">SANTO DOMINGO SUCHITEPEQUEZ</option>
<option value="143">SAN LORENZO</option>
<option value="144">SAMAYAC</option>
<option value="145">SAN PABLO JOCOPILAS</option>
<option value="146">SAN ANTONIO SUCHITEPÉQUEZ</option>
<option value="147">SAN MIGUEL PANÁN</option>
<option value="148">SAN GABRIEL</option>
<option value="149">CHICACAO</option>
<option value="150">PATULUL</option>
<option value="151">SANTA BÁRBARA</option>
<option value="152">SAN JUAN BAUTISTA</option>
<option value="153">SANTO TOMÁS LA UNIÓN</option>
<option value="154">ZUNILITO</option>
<option value="155">PUEBLO NUEVO</option>
<option value="156">RÍO BRAVO</option>
<option value="157">SAN JOSÉ LA MÁQUINA</option>
<option value="158">RETALHULEU</option>
<option value="159">SAN SEBASTIÁN</option>
<option value="160">SANTA CRUZ MULUÁ</option>
<option value="161">SAN MARTÍN ZAPOTITLÁN</option>
<option value="162">SAN FELIPE</option>
<option value="163">SAN ANDRÉS VILLA SECA</option>
<option value="164">CHAMPERICO</option>
<option value="165">NUEVO SAN CARLOS</option>
<option value="166">EL ASINTAL</option>
<option value="167">SAN MARCOS</option>
<option value="168">SAN PEDRO SACATEPÉQUEZ</option>
<option value="169">SAN ANTONIO SACATEPÉQUEZ</option>
<option value="170">COMITANCILLO</option>
<option value="171">SAN MIGUEL IXTAHUACÁN</option>
<option value="172">CONCEPCIÓN TUTUAPA</option>
<option value="173">TACANÁ</option>
<option value="174">SIBINAL</option>
<option value="175">TAJUMULCO</option>
<option value="176">TEJUTLA</option>
<option value="177">SAN RAFAEL PIE DE LA CUESTA</option>
<option value="178">NUEVO PROGRESO</option>
<option value="179">EL TUMBADOR</option>
<option value="180">SAN JOSE EL RODEO</option>
<option value="181">MALACATÁN</option>
<option value="182">CATARINA</option>
<option value="183">AYUTLA (TECUN UMAN)</option>
<option value="184">CIUDAD TECÚN UMÁN</option>
<option value="185">OCÓS</option>
<option value="186">SAN PABLO</option>
<option value="187">EL QUETZAL</option>
<option value="188">LA REFORMA</option>
<option value="189">PAJAPITA</option>
<option value="190">IXCHIGUÁN</option>
<option value="191">SAN JOSÉ OJETENAM</option>
<option value="192">SAN CRISTÓBAL CUCHO</option>
<option value="193">SIPACAPA</option>
<option value="194">ESQUIPULAS PALO GORDO</option>
<option value="195">RÍO BLANCO</option>
<option value="196">SAN LORENZO</option>
<option value="197">LA BLANCA</option>
<option value="198">HUEHUETENANGO</option>
<option value="199">CHIANTLA</option>
<option value="200">MALACATANCITO</option>
<option value="201">CUILCO</option>
<option value="202">NENTÓN</option>
<option value="203">SAN PEDRO NECTA</option>
<option value="204">JACALTENANGO</option>
<option value="205">SOLOMA</option>
<option value="206">IXTAHUACÁN</option>
<option value="207">SANTA BÁRBARA</option>
<option value="208">LA LIBERTAD</option>
<option value="209">LA DEMOCRACIA</option>
<option value="210">SAN MIGUEL ACATÁN</option>
<option value="211">SAN RAFAEL LA INDEPENDENCIA</option>
<option value="212">TODOS SANTOS CUCHUMATÁN</option>
<option value="213">SAN JUAN ATITÁN</option>
<option value="214">SANTA EULALIA</option>
<option value="215">SAN MATEO IXTATÁN</option>
<option value="216">COLOTENANGO</option>
<option value="217">SAN SEBASTIÁN HUEHUETENANGO</option>
<option value="218">TECTITÁN</option>
<option value="219">CONCEPCIÓN HUISTA</option>
<option value="220">SAN JUAN IXCOY</option>
<option value="221">SAN ANTONIO HUISTA</option>
<option value="222">SAN SEBASTIÁN COATÁN</option>
<option value="223">BARILLAS</option>
<option value="224">AGUACATÁN</option>
<option value="225">SAN RAFAEL PETZAL</option>
<option value="226">SAN GASPAR IXCHIL</option>
<option value="227">SANTIAGO CHIMALTENANGO</option>
<option value="228">SANTA ANA HUISTA</option>
<option value="229">UNION CANTINIL</option>
<option value="230">PETATÁN</option>
<option value="231">SANTA CRUZ DEL QUICHÉ</option>
<option value="232">CHICHÉ</option>
<option value="233">CHINIQUE</option>
<option value="234">ZACUALPA</option>
<option value="235">CHAJUL</option>
<option value="236">CHICHICASTENANGO</option>
<option value="237">PATZITE</option>
<option value="238">SAN ANTONIO ILOTENANGO</option>
<option value="239">SAN PEDRO JOCOPILAS</option>
<option value="240">CUNÉN</option>
<option value="241">SAN JUAN COTZAL</option>
<option value="242">JOYABAJ</option>
<option value="243">NEBAJ</option>
<option value="244">SAN ANDRÉS SAJCABAJA</option>
<option value="245">SAN MIGUEL USPANTÁN</option>
<option value="246">SACAPULAS</option>
<option value="247">SAN BARTOLOMÉ JOCOTENANGO</option>
<option value="248">CANILLÁ</option>
<option value="249">CHICAMÁN</option>
<option value="250">IXCÁN</option>
<option value="251">PACHALUM</option>
<option value="252">SALAMÁ</option>
<option value="253">SAN MIGUEL CHICAJ</option>
<option value="254">RABINAL</option>
<option value="255">CUBULCO</option>
<option value="256">GRANADOS</option>
<option value="257">EL CHOL</option>
<option value="258">SAN JERÓNIMO</option>
<option value="259">PURULHÁ</option>
<option value="260">COBÁN</option>
<option value="261">SANTA CRUZ VERAPAZ</option>
<option value="262">SAN CRISTÓBAL VERAPAZ</option>
<option value="263">TACTIC</option>
<option value="264">TAMAHÚ</option>
<option value="265">TUCURÚ</option>
<option value="266">PANZÓS</option>
<option value="267">SENAHÚ</option>
<option value="268">SAN PEDRO CARCHÁ</option>
<option value="269">SAN JUAN CHAMELCO</option>
<option value="270">LANQUÍN</option>
<option value="271">CAHABÓN</option>
<option value="272">CHISEC</option>
<option value="273">CHAHAL</option>
<option value="274">FRAY BARTOLOMÉ DE LAS CASAS</option>
<option value="275">SANTA CATARINA LA TINTA</option>
<option value="276">RAXRUHA</option>
<option value="277">FLORES</option>
<option value="278">SANTA ELENA</option>
<option value="279">SAN JOSÉ</option>
<option value="280">SAN BENITO</option>
<option value="281">SAN ANDRÉS</option>
<option value="282">LA LIBERTAD</option>
<option value="283">SAN FRANCISCO</option>
<option value="284">SANTA ANA</option>
<option value="285">DOLORES</option>
<option value="286">SAN LUIS</option>
<option value="287">SAYAXCHÉ</option>
<option value="288">MELCHOR DE MENCOS</option>
<option value="289">POPTÚN</option>
<option value="290">LAS CRUCES</option>
<option value="291">EL CHAL</option>
<option value="292">PUERTO BARRIOS</option>
<option value="293">LIVINGSTON</option>
<option value="294">EL ESTOR</option>
<option value="295">MORALES</option>
<option value="296">LOS AMATES</option>
<option value="297">ZACAPA</option>
<option value="298">ESTANZUELA</option>
<option value="299">RÍO HONDO</option>
<option value="300">GUALÁN</option>
<option value="301">TECULUTÁN</option>
<option value="302">USUMATLÁN</option>
<option value="303">CABAÑAS</option>
<option value="304">SAN DIEGO</option>
<option value="305">LA UNIÓN</option>
<option value="306">HUITÉ</option>
<option value="307">SAN JORGE</option>
<option value="308">CHIQUIMULA</option>
<option value="309">SAN JOSÉ LA ARADA</option>
<option value="310">SAN JUAN ERMITA</option>
<option value="311">JOCOTÁN</option>
<option value="312">CAMOTÁN</option>
<option value="313">OLOPA</option>
<option value="314">ESQUIPULAS</option>
<option value="315">CONCEPCIÓN LAS MINAS</option>
<option value="316">QUETZALTEPEQUE</option>
<option value="317">SAN JACINTO</option>
<option value="318">IPALA</option>
<option value="319">JALAPA</option>
<option value="320">SAN PEDRO PINULA</option>
<option value="321">SAN LUIS JILOTEPEQUE</option>
<option value="322">SAN MIGUEL CHAPARRÓN</option>
<option value="323">SAN CARLOS ALZATATE</option>
<option value="324">MONJAS</option>
<option value="325">MATAQUESCUINTLA</option>
<option value="326">JUTIAPA</option>
<option value="327">EL PROGRESO</option>
<option value="328">SANTA CATARINA MITA</option>
<option value="329">AGUA BLANCA</option>
<option value="330">ASUNCIÓN MITA</option>
<option value="331">YUPILTEPEQUE</option>
<option value="332">ATESCATEMPA</option>
<option value="333">JEREZ</option>
<option value="334">EL ADELANTO</option>
<option value="335">ZAPOTITLÁN</option>
<option value="336">COMAPA</option>
<option value="337">JALPATAGUA</option>
<option value="338">CONGUACO</option>
<option value="339">MOYUTA</option>
<option value="340">PASACO</option>
<option value="341">SAN JOSÉ ACATEMPA</option>
<option value="342">QUEZADA</option>`
      );
      selectMuniActual[0].disabled = false;
    });
  }
}
function cargarDepartamentos(selectDepartamentos) {
  for (let i = 0; i < selectDepartamentos.length; i++) {
    $(selectDepartamentos[i]).empty();
    $(selectDepartamentos[i]).append(
      '<option value="" disabled selected>Selecciona</option>'
    );
    $(selectDepartamentos[i]).append(
      `<option value="1">GUATEMALA</option>
          <option value="2">SACATEPÉQUEZ</option>
          <option value="3">CHIMALTENANGO</option>
          <option value="4">EL PROGRESO</option>
          <option value="5">ESCUINTLA</option>
          <option value="6">SANTA ROSA</option>
          <option value="7"> SOLOLÁ</option>
          <option value="8"> TOTONICAPÁN</option>
          <option value="9"> QUETZALTENANGO</option>
          <option value="10"> SUCHITEPÉQUEZ</option>
          <option value="11"> RETALHULEU</option>
          <option value="12"> SAN MARCOS</option>
          <option value="13"> HUEHUETENANGO</option>
          <option value="14"> EL QUICHÉ</option>
          <option value="15"> BAJA VERAPAZ</option>
          <option value="16"> ALTA VERAPAZ</option>
          <option value="17"> PETÉN</option>
          <option value="18"> IZABAL</option>
          <option value="19"> ZACAPA</option>
          <option value="20"> CHIQUIMULA</option>
          <option value="21"> JALAPA</option>
          <option value="22"> JUTIAPA</option>`
    );
  }
  cargarMunicipios(selectDepartamentos);
}
function cargarMoneda(selectMoneda) {
  for (let i = 0; i < selectMoneda.length; i++) {
    $(selectMoneda[i]).empty();
    $(selectMoneda[i]).append(
      '<option value="" disabled selected>Selecciona</option>'
    );
    $(selectMoneda[i]).append(
      `  <option value="1">GTQ-QUETZAL</option>
  <option value="2">AED-DÍRHAM DE LOS EMIRATOS ÁRABES UNIDOS</option>
  <option value="3">AFN-AFGANI</option>
  <option value="4">ALL-LEK</option>
  <option value="5">AMD-DRAM ARMENIO</option>
  <option value="6">ANG-FLORÍN ANTILLANO NEERLANDÉS</option>
  <option value="7">AOA-KWANZA</option>
  <option value="8">ARS-PESO ARGENTINO</option>
  <option value="9">AUD-DÓLAR AUSTRALIANO</option>
  <option value="10">AWG-FLORÍN ARUBEÑO</option>
  <option value="11">AZN-MANAT AZERBAIYANO</option>
  <option value="12">BAM-MARCO CONVERTIBLE</option>
  <option value="13">BBD-DÓLAR BARBADENSE</option>
  <option value="14">BDT-TAKA</option>
  <option value="15">BGN-LEV BÚLGARO</option>
  <option value="16">BHD-DINAR BAREINÍ</option>
  <option value="17">BIF-FRANCO DE BURUNDI</option>
  <option value="18">BMD-DÓLAR BERMUDEÑO</option>
  <option value="19">BND-DÓLAR DE BRUNÉI</option>
  <option value="20">BOB-BOLIVIANO</option>
  <option value="21">BOV-MVDOL</option>
  <option value="22">BRL-REAL BRASILEÑO</option>
  <option value="23">BSD-DÓLAR BAHAMEÑO</option>
  <option value="24">BTN-NGULTRUM</option>
  <option value="25">BWP-PULA</option>
  <option value="26">BYN-RUBLO BIELORRUSO</option>
  <option value="27">BZD-DÓLAR BELICEÑO</option>
  <option value="28">CAD-DÓLAR CANADIENSE</option>
  <option value="29">CDF-FRANCO CONGOLEÑO</option>
  <option value="30">CHE-EURO&nbsp;WIR</option>
  <option value="31">CHF-FRANCO SUIZO</option>
  <option value="32">CHW-FRANCO&nbsp;WIR</option>
  <option value="33">CLF-UNIDAD DE FOMENTO</option>
  <option value="34">CLP-PESO CHILENO</option>
  <option value="35">CNY-YUAN CHINO</option>
  <option value="36">COP-PESO COLOMBIANO</option>
  <option value="37">COU-UNIDAD DE VALOR REAL</option>
  <option value="38">CRC-COLÓN COSTARRICENSE</option>
  <option value="39">CUC-PESO CONVERTIBLE</option>
  <option value="40">CUP-PESO CUBANO</option>
  <option value="41">CVE-ESCUDO CABOVERDIANO</option>
  <option value="42">CZK-CORONA CHECA</option>
  <option value="43">DJF-FRANCO YIBUTIANO</option>
  <option value="44">DKK-CORONA DANESA</option>
  <option value="45">DOP-PESO DOMINICANO</option>
  <option value="46">DZD-DINAR ARGELINO</option>
  <option value="47">EGP-LIBRA EGIPCIA</option>
  <option value="48">ERN-NAKFA</option>
  <option value="49">ETB-BIRR ETÍOPE</option>
  <option value="50">EUR-EURO</option>
  <option value="51">FJD-DÓLAR FIYIANO</option>
  <option value="52">FKP-LIBRA MALVINENSE</option>
  <option value="53">GBP-LIBRA ESTERLINA</option>
  <option value="54">GEL-LARI</option>
  <option value="55">GHS-CEDI GHANÉS</option>
  <option value="56">GIP-LIBRA DE GIBRALTAR</option>
  <option value="57">GMD-DALASI</option>
  <option value="58">GNF-FRANCO GUINEANO</option>
  <option value="59">GYD-DÓLAR GUYANÉS</option>
  <option value="60">HKD-DÓLAR DE HONG KONG</option>
  <option value="61">HNL-LEMPIRA</option>
  <option value="62">HRK-KUNA</option>
  <option value="63">HTG-GOURDE</option>
  <option value="64">HUF-FORINTO</option>
  <option value="65">IDR-RUPIA INDONESIA</option>
  <option value="66">ILS-NUEVO SÉQUEL ISRAELÍ</option>
  <option value="67">INR-RUPIA INDIA</option>
  <option value="68">IQD-DINAR IRAQUÍ</option>
  <option value="69">IRR-RIAL IRANÍ</option>
  <option value="70">ISK-CORONA ISLANDESA</option>
  <option value="71">JMD-DÓLAR JAMAIQUINO</option>
  <option value="72">JOD-DINAR JORDANO</option>
  <option value="73">JPY-YEN</option>
  <option value="74">KES-CHELÍN KENIANO</option>
  <option value="75">KGS-SOM</option>
  <option value="76">KHR-RIEL</option>
  <option value="77">KMF-FRANCO COMORENSE</option>
  <option value="78">KPW-WON NORCOREANO</option>
  <option value="79">KRW-WON</option>
  <option value="80">KWD-DINAR KUWAITÍ</option>
  <option value="81">KYD-DÓLAR DE LAS ISLAS CAIMÁN</option>
  <option value="82">KZT-TENGE</option>
  <option value="83">LAK-KIP</option>
  <option value="84">LBP-LIBRA LIBANESA</option>
  <option value="85">LKR-RUPIA DE SRI LANKA</option>
  <option value="86">LRD-DÓLAR LIBERIANO</option>
  <option value="87">LSL-LOTI</option>
  <option value="88">LYD-DINAR LIBIO</option>
  <option value="89">MAD-DÍRHAM MARROQUÍ</option>
  <option value="90">MDL-LEU MOLDAVO</option>
  <option value="91">MGA-ARIARY MALGACHE</option>
  <option value="92">MKD-DENAR</option>
  <option value="93">MMK-KYAT</option>
  <option value="94">MNT-TUGRIK</option>
  <option value="95">MOP-PATACA</option>
  <option value="96">MRU-UGUIYA</option>
  <option value="97">MUR-RUPIA DE MAURICIO</option>
  <option value="98">MVR-RUFIYAA</option>
  <option value="99">MWK-KWACHA</option>
  <option value="100">MXN-PESO MEXICANO</option>
  <option value="101">MXV-UNIDAD DE INVERSIÓN (UDI) MEXICANA</option>
  <option value="102">MYR-RINGGIT MALAYO</option>
  <option value="103">MZN-METICAL MOZAMBIQUEÑO</option>
  <option value="104">NAD-DÓLAR NAMIBIO</option>
  <option value="105">NGN-NAIRA</option>
  <option value="106">NIO-CÓRDOBA</option>
  <option value="107">NOK-CORONA NORUEGA</option>
  <option value="108">NPR-RUPIA NEPALÍ</option>
  <option value="109">NZD-DÓLAR NEOZELANDÉS</option>
  <option value="110">OMR-RIAL OMANÍ</option>
  <option value="111">PAB-BALBOA</option>
  <option value="112">PEN-SOL</option>
  <option value="113">PGK-KINA</option>
  <option value="114">PHP-PESO FILIPINO</option>
  <option value="115">PKR-RUPIA PAKISTANÍ</option>
  <option value="116">PLN-ZŁOTY</option>
  <option value="117">PYG-GUARANÍ</option>
  <option value="118">QAR-RIAL CATARÍ</option>
  <option value="119">RON-LEU RUMANO</option>
  <option value="120">RSD-DINAR SERBIO</option>
  <option value="121">RUB-RUBLO RUSO</option>
  <option value="122">RWF-FRANCO RUANDÉS</option>
  <option value="123">SAR-RIAL SAUDÍ</option>
  <option value="124">SBD-DÓLAR DE LAS ISLAS SALOMÓN</option>
  <option value="125">SCR-RUPIA SEYCHELENSE</option>
  <option value="126">SDG-LIBRA SUDANESA</option>
  <option value="127">SEK-CORONA SUECA</option>
  <option value="128">SGD-DÓLAR DE SINGAPUR</option>
  <option value="129">SHP-LIBRA DE SANTA ELENA</option>
  <option value="130">SLL-LEONE</option>
  <option value="131">SOS-CHELÍN SOMALÍ</option>
  <option value="132">SRD-DÓLAR SURINAMÉS</option>
  <option value="133">SSP-LIBRA SURSUDANESA</option>
  <option value="134">STN-DOBRA</option>
  <option value="135">SVC-COLÓN SALVADOREÑO</option>
  <option value="136">SYP-LIBRA SIRIA</option>
  <option value="137">SZL-LILANGENI</option>
  <option value="138">THB-BAHT</option>
  <option value="139">TJS-SOMONI TAYIKO</option>
  <option value="140">TMT-MANAT TURCOMANO</option>
  <option value="141">TND-DINAR TUNECINO</option>
  <option value="142">TOP-PAʻANGA</option>
  <option value="143">TRY-LIRA TURCA</option>
  <option value="144">TTD-DÓLAR DE TRINIDAD Y TOBAGO</option>
  <option value="145">TWD-NUEVO DÓLAR TAIWANÉS</option>
  <option value="146">TZS-CHELÍN TANZANO</option>
  <option value="147">UAH-GRIVNA</option>
  <option value="148">UGX-CHELÍN UGANDÉS</option>
  <option value="149">USD-DÓLAR ESTADOUNIDENSE</option>
  <option value="150">USN-DÓLAR ESTADOUNIDENSE (SIGUIENTE DÍA)</option>
  <option value="151">UYI-PESO EN UNIDADES INDEXADAS (URUGUAY)</option>
  <option value="152">UYU-PESO URUGUAYO</option>
  <option value="153">UYW-UNIDAD PREVISIONAL</option>
  <option value="154">UZS-SOM UZBEKO</option>
  <option value="155">VEF-BOLIBAR VENEZOLANO FUERTE</option>
  <option value="156">VND-DONG VIETNAMITA</option>
  <option value="157">VUV-VATU</option>
  <option value="158">WST-TALA</option>
  <option value="159">XAF-FRANCO CFA DE ÁFRICA CENTRAL</option>
  <option value="160">XAG-PLATA&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
  <option value="161">XAU-ORO&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
  <option value="162">XCD-DÓLAR DEL CARIBE ORIENTAL</option>
  <option value="163">XDR-DERECHOS ESPECIALES DE GIRO</option>
  <option value="164">XOF-FRANCO CFA DE ÁFRICA OCCIDENTAL</option>
  <option value="165">XPD-PALADIO&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
  <option value="166">XPF-FRANCO CFP</option>
  <option value="167">XPT-PLATINO&nbsp;(DENOMINADO EN&nbsp;ONZA TROY)</option>
  <option value="168">XSU-SUCRE</option>
  <option value="169">XTS-RESERVADO PARA PRUEBAS</option>
  <option value="170">XUA-UNIDAD DE CUENTA BAD</option>
  <option value="171">YER-RIAL YEMENÍ</option>
  <option value="172">ZAR-RAND</option>
  <option value="173">ZMW-KWACHA ZAMBIANO</option>
  <option value="174">ZWD-DÓLAR ZIMBABUENSE</option>`
    );
  }
}
function cargarPais(selectPais) {
  for (let i = 0; i < selectPais.length; i++) {
    $(selectPais[i]).empty();
    $(selectPais[i]).append(
      '<option value="" disabled selected>Selecciona</option>'
    );
    $(selectPais[i]).append(
      ` <OPTION VALUE="1">GUATEMALA</OPTION>
                          <OPTION VALUE="2">AFGANISTÁN</OPTION>
                          <OPTION VALUE="3">ÅLAND</OPTION>
                          <OPTION VALUE="4">ALBANIA</OPTION>
                          <OPTION VALUE="5">ALEMANIA</OPTION>
                          <OPTION VALUE="6">ANDORRA</OPTION>
                          <OPTION VALUE="7">ANGOLA</OPTION>
                          <OPTION VALUE="8">ANGUILA</OPTION>
                          <OPTION VALUE="9">ANTÁRTIDA</OPTION>
                          <OPTION VALUE="10">ANTIGUA Y BARBUDA</OPTION>
                          <OPTION VALUE="11">ARABIA SAUDITA</OPTION>
                          <OPTION VALUE="12">ARGELIA</OPTION>
                          <OPTION VALUE="13">ARGENTINA</OPTION>
                          <OPTION VALUE="14">ARMENIA</OPTION>
                          <OPTION VALUE="15">ARUBA</OPTION>
                          <OPTION VALUE="16">AUSTRALIA</OPTION>
                          <OPTION VALUE="17">AUSTRIA</OPTION>
                          <OPTION VALUE="18">AZERBAIYÁN</OPTION>
                          <OPTION VALUE="19">BAHAMAS</OPTION>
                          <OPTION VALUE="20">BANGLADÉS</OPTION>
                          <OPTION VALUE="21">BARBADOS</OPTION>
                          <OPTION VALUE="22">BARÉIN</OPTION>
                          <OPTION VALUE="23">BÉLGICA</OPTION>
                          <OPTION VALUE="24">BELICE</OPTION>
                          <OPTION VALUE="25">BENÍN</OPTION>
                          <OPTION VALUE="26">BERMUDAS</OPTION>
                          <OPTION VALUE="27">BIELORRUSIA</OPTION>
                          <OPTION VALUE="28">BIRMANIA</OPTION>
                          <OPTION VALUE="29">BOLIVIA</OPTION>
                          <OPTION VALUE="30">BONAIRE</OPTION>
                          <OPTION VALUE="31">BOSNIA Y HERZEGOVINA</OPTION>
                          <OPTION VALUE="32">BOTSUANA</OPTION>
                          <OPTION VALUE="33">BRASIL</OPTION>
                          <OPTION VALUE="34">BRUNÉI</OPTION>
                          <OPTION VALUE="35">BULGARIA</OPTION>
                          <OPTION VALUE="36">BURKINA FASO</OPTION>
                          <OPTION VALUE="37">BURUNDI</OPTION>
                          <OPTION VALUE="38">BUTÁN</OPTION>
                          <OPTION VALUE="39">CABO VERDE</OPTION>
                          <OPTION VALUE="40">CAMBOYA</OPTION>
                          <OPTION VALUE="41">CAMERÚN</OPTION>
                          <OPTION VALUE="42">CANADÁ</OPTION>
                          <OPTION VALUE="43">CATAR</OPTION>
                          <OPTION VALUE="44">CHAD</OPTION>
                          <OPTION VALUE="45">CHILE</OPTION>
                          <OPTION VALUE="46">CHINA</OPTION>
                          <OPTION VALUE="47">CHIPRE</OPTION>
                          <OPTION VALUE="48">CIUDAD DEL VATICANO</OPTION>
                          <OPTION VALUE="49">COLOMBIA</OPTION>
                          <OPTION VALUE="50">COMORAS</OPTION>
                          <OPTION VALUE="51">COREA DEL NORTE</OPTION>
                          <OPTION VALUE="52">COREA DEL SUR</OPTION>
                          <OPTION VALUE="53">COSTA DE MARFIL</OPTION>
                          <OPTION VALUE="54">COSTA RICA</OPTION>
                          <OPTION VALUE="55">CROACIA</OPTION>
                          <OPTION VALUE="56">CUBA</OPTION>
                          <OPTION VALUE="57">CURAZAO</OPTION>
                          <OPTION VALUE="58">DINAMARCA</OPTION>
                          <OPTION VALUE="59">DOMINICA</OPTION>
                          <OPTION VALUE="60">ECUADOR</OPTION>
                          <OPTION VALUE="61">EGIPTO</OPTION>
                          <OPTION VALUE="62">EL SALVADOR</OPTION>
                          <OPTION VALUE="63">EMIRATOS ÁRABES UNIDOS</OPTION>
                          <OPTION VALUE="64">ERITREA</OPTION>
                          <OPTION VALUE="65">ESLOVAQUIA</OPTION>
                          <OPTION VALUE="66">ESLOVENIA</OPTION>
                          <OPTION VALUE="67">ESPAÑA</OPTION>
                          <OPTION VALUE="68">ESTADOS UNIDOS</OPTION>
                          <OPTION VALUE="69">ESTONIA</OPTION>
                          <OPTION VALUE="70">ETIOPÍA</OPTION>
                          <OPTION VALUE="71">FILIPINAS</OPTION>
                          <OPTION VALUE="72">FINLANDIA</OPTION>
                          <OPTION VALUE="73">FIYI</OPTION>
                          <OPTION VALUE="74">FRANCIA</OPTION>
                          <OPTION VALUE="75">GABÓN</OPTION>
                          <OPTION VALUE="76">GAMBIA</OPTION>
                          <OPTION VALUE="77">GEORGIA</OPTION>
                          <OPTION VALUE="78">GHANA</OPTION>
                          <OPTION VALUE="79">GIBRALTAR</OPTION>
                          <OPTION VALUE="80">GRANADA</OPTION>
                          <OPTION VALUE="81">GRECIA</OPTION>
                          <OPTION VALUE="82">GROENLANDIA</OPTION>
                          <OPTION VALUE="83">GUADALUPE</OPTION>
                          <OPTION VALUE="84">GUAM</OPTION>
                          <OPTION VALUE="85">GUAYANA FRANCESA</OPTION>
                          <OPTION VALUE="86">GUERNSEY</OPTION>
                          <OPTION VALUE="87">GUINEA</OPTION>
                          <OPTION VALUE="88">GUINEA ECUATORIAL</OPTION>
                          <OPTION VALUE="89">GUINEA-BISÁU</OPTION>
                          <OPTION VALUE="90">GUYANA</OPTION>
                          <OPTION VALUE="91">HAITÍ</OPTION>
                          <OPTION VALUE="92">HONDURAS</OPTION>
                          <OPTION VALUE="93">HONG KONG</OPTION>
                          <OPTION VALUE="94">HUNGRÍA</OPTION>
                          <OPTION VALUE="95">INDIA</OPTION>
                          <OPTION VALUE="96">INDONESIA</OPTION>
                          <OPTION VALUE="97">IRAK</OPTION>
                          <OPTION VALUE="98">IRÁN</OPTION>
                          <OPTION VALUE="99">IRLANDA</OPTION>
                          <OPTION VALUE="100">ISLA BOUVET</OPTION>
                          <OPTION VALUE="101">ISLA DE MAN</OPTION>
                          <OPTION VALUE="102">ISLA DE NAVIDAD</OPTION>
                          <OPTION VALUE="103">ISLA NORFOLK</OPTION>
                          <OPTION VALUE="104">ISLANDIA</OPTION>
                          <OPTION VALUE="105">ISLAS CAIMÁN</OPTION>
                          <OPTION VALUE="106">ISLAS COCOS</OPTION>
                          <OPTION VALUE="107">ISLAS COOK</OPTION>
                          <OPTION VALUE="108">ISLAS FEROE</OPTION>
                          <OPTION VALUE="109">ISLAS GEORGIAS DEL SUR Y SANDWICH DEL SUR</OPTION>
                          <OPTION VALUE="110">ISLAS HEARD Y MCDONALD</OPTION>
                          <OPTION VALUE="111">ISLAS MALVINAS</OPTION>
                          <OPTION VALUE="112">ISLAS MARIANAS DEL NORTE</OPTION>
                          <OPTION VALUE="113">ISLAS MARSHALL</OPTION>
                          <OPTION VALUE="114">ISLAS PITCAIRN</OPTION>
                          <OPTION VALUE="115">ISLAS SALOMÓN</OPTION>
                          <OPTION VALUE="116">ISLAS TURCAS Y CAICOS</OPTION>
                          <OPTION VALUE="117">ISLAS ULTRAMARINAS MENORES DE LOS ESTADOS UNIDOS</OPTION>
                          <OPTION VALUE="118">ISLAS VÍRGENES AMERICANAS</OPTION>
                          <OPTION VALUE="119">ISLAS VÍRGENES BRITÁNICAS</OPTION>
                          <OPTION VALUE="120">ISRAEL</OPTION>
                          <OPTION VALUE="121">ITALIA</OPTION>
                          <OPTION VALUE="122">JAMAICA</OPTION>
                          <OPTION VALUE="123">JAPÓN</OPTION>
                          <OPTION VALUE="124">JERSEY</OPTION>
                          <OPTION VALUE="125">JORDANIA</OPTION>
                          <OPTION VALUE="126">KAZAJISTÁN</OPTION>
                          <OPTION VALUE="127">KENIA</OPTION>
                          <OPTION VALUE="128">KIRGUISTÁN</OPTION>
                          <OPTION VALUE="129">KIRIBATI</OPTION>
                          <OPTION VALUE="130">KUWAIT</OPTION>
                          <OPTION VALUE="131">LAOS</OPTION>
                          <OPTION VALUE="132">LESOTO</OPTION>
                          <OPTION VALUE="133">LETONIA</OPTION>
                          <OPTION VALUE="134">LÍBANO</OPTION>
                          <OPTION VALUE="135">LIBERIA</OPTION>
                          <OPTION VALUE="136">LIBIA</OPTION>
                          <OPTION VALUE="137">LIECHTENSTEIN</OPTION>
                          <OPTION VALUE="138">LITUANIA</OPTION>
                          <OPTION VALUE="139">LUXEMBURGO</OPTION>
                          <OPTION VALUE="140">MACAO</OPTION>
                          <OPTION VALUE="141">MACEDONIA DEL NORTE</OPTION>
                          <OPTION VALUE="142">MADAGASCAR</OPTION>
                          <OPTION VALUE="143">MALASIA</OPTION>
                          <OPTION VALUE="144">MALAUI</OPTION>
                          <OPTION VALUE="145">MALDIVAS</OPTION>
                          <OPTION VALUE="146">MALÍ</OPTION>
                          <OPTION VALUE="147">MALTA</OPTION>
                          <OPTION VALUE="148">MARRUECOS</OPTION>
                          <OPTION VALUE="149">MARTINICA</OPTION>
                          <OPTION VALUE="150">MAURICIO</OPTION>
                          <OPTION VALUE="151">MAURITANIA</OPTION>
                          <OPTION VALUE="152">MAYOTTE</OPTION>
                          <OPTION VALUE="153">MÉXICO</OPTION>
                          <OPTION VALUE="154">MICRONESIA</OPTION>
                          <OPTION VALUE="155">MOLDAVIA</OPTION>
                          <OPTION VALUE="156">MÓNACO</OPTION>
                          <OPTION VALUE="157">MONGOLIA</OPTION>
                          <OPTION VALUE="158">MONTENEGRO</OPTION>
                          <OPTION VALUE="159">MONTSERRAT</OPTION>
                          <OPTION VALUE="160">MOZAMBIQUE</OPTION>
                          <OPTION VALUE="161">NAMIBIA</OPTION>
                          <OPTION VALUE="162">NAURU</OPTION>
                          <OPTION VALUE="163">NEPAL</OPTION>
                          <OPTION VALUE="164">NICARAGUA</OPTION>
                          <OPTION VALUE="165">NÍGER</OPTION>
                          <OPTION VALUE="166">NIGERIA</OPTION>
                          <OPTION VALUE="167">NIUE</OPTION>
                          <OPTION VALUE="168">NORUEGA</OPTION>
                          <OPTION VALUE="169">NUEVA CALEDONIA</OPTION>
                          <OPTION VALUE="170">NUEVA ZELANDA</OPTION>
                          <OPTION VALUE="171">OMÁN</OPTION>
                          <OPTION VALUE="172">PAÍSES BAJOS</OPTION>
                          <OPTION VALUE="173">PAKISTÁN</OPTION>
                          <OPTION VALUE="174">PALAOS</OPTION>
                          <OPTION VALUE="175">PALESTINA</OPTION>
                          <OPTION VALUE="176">PANAMÁ</OPTION>
                          <OPTION VALUE="177">PAPÚA NUEVA GUINEA</OPTION>
                          <OPTION VALUE="178">PARAGUAY</OPTION>
                          <OPTION VALUE="179">PERÚ</OPTION>
                          <OPTION VALUE="180">POLINESIA FRANCESA</OPTION>
                          <OPTION VALUE="181">POLONIA</OPTION>
                          <OPTION VALUE="182">PORTUGAL</OPTION>
                          <OPTION VALUE="183">PUERTO RICO</OPTION>
                          <OPTION VALUE="184">REINO UNIDO</OPTION>
                          <OPTION VALUE="185">REPÚBLICA ÁRABE SAHARAUI DEMOCRÁTICA</OPTION>
                          <OPTION VALUE="186">REPÚBLICA CENTROAFRICANA</OPTION>
                          <OPTION VALUE="187">REPÚBLICA CHECA</OPTION>
                          <OPTION VALUE="188">REPÚBLICA DEL CONGO</OPTION>
                          <OPTION VALUE="189">REPÚBLICA DEMOCRÁTICA DEL CONGO</OPTION>
                          <OPTION VALUE="190">REPÚBLICA DOMINICANA</OPTION>
                          <OPTION VALUE="191">REUNIÓN</OPTION>
                          <OPTION VALUE="192">RUANDA</OPTION>
                          <OPTION VALUE="193">RUMANIA</OPTION>
                          <OPTION VALUE="194">RUSIA</OPTION>
                          <OPTION VALUE="195">SAMOA</OPTION>
                          <OPTION VALUE="196">SAMOA AMERICANA</OPTION>
                          <OPTION VALUE="197">SAN BARTOLOMÉ</OPTION>
                          <OPTION VALUE="198">SAN CRISTÓBAL Y NIEVES</OPTION>
                          <OPTION VALUE="199">SAN MARINO</OPTION>
                          <OPTION VALUE="200">SAN MARTÍN</OPTION>
                          <OPTION VALUE="201">SAN MARTÍN</OPTION>
                          <OPTION VALUE="202">SAN PEDRO Y MIQUELÓN</OPTION>
                          <OPTION VALUE="203">SAN VICENTE Y LAS GRANADINAS</OPTION>
                          <OPTION VALUE="204">SANTA ELENA</OPTION>
                          <OPTION VALUE="205">SANTA LUCÍA</OPTION>
                          <OPTION VALUE="206">SANTO TOMÉ Y PRÍNCIPE</OPTION>
                          <OPTION VALUE="207">SENEGAL</OPTION>
                          <OPTION VALUE="208">SERBIA</OPTION>
                          <OPTION VALUE="209">SEYCHELLES</OPTION>
                          <OPTION VALUE="210">SIERRA LEONA</OPTION>
                          <OPTION VALUE="211">SINGAPUR</OPTION>
                          <OPTION VALUE="212">SIRIA</OPTION>
                          <OPTION VALUE="213">SOMALIA</OPTION>
                          <OPTION VALUE="214">SRI LANKA</OPTION>
                          <OPTION VALUE="215">SUAZILANDIA</OPTION>
                          <OPTION VALUE="216">SUDÁFRICA</OPTION>
                          <OPTION VALUE="217">SUDÁN</OPTION>
                          <OPTION VALUE="218">SUDÁN DEL SUR</OPTION>
                          <OPTION VALUE="219">SUECIA</OPTION>
                          <OPTION VALUE="220">SUIZA</OPTION>
                          <OPTION VALUE="221">SURINAM</OPTION>
                          <OPTION VALUE="222">SVALBARD Y JAN MAYEN</OPTION>
                          <OPTION VALUE="223">TAILANDIA</OPTION>
                          <OPTION VALUE="224">TAIWÁN (REPÚBLICA DE CHINA)</OPTION>
                          <OPTION VALUE="225">TANZANIA</OPTION>
                          <OPTION VALUE="226">TAYIKISTÁN</OPTION>
                          <OPTION VALUE="227">TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO</OPTION>
                          <OPTION VALUE="228">TIERRAS AUSTRALES Y ANTÁRTICAS FRANCESAS</OPTION>
                          <OPTION VALUE="229">TIMOR ORIENTAL</OPTION>
                          <OPTION VALUE="230">TOGO</OPTION>
                          <OPTION VALUE="231">TOKELAU</OPTION>
                          <OPTION VALUE="232">TONGA</OPTION>
                          <OPTION VALUE="233">TRINIDAD Y TOBAGO</OPTION>
                          <OPTION VALUE="234">TÚNEZ</OPTION>
                          <OPTION VALUE="235">TURKMENISTÁN</OPTION>
                          <OPTION VALUE="236">TURQUÍA</OPTION>
                          <OPTION VALUE="237">TUVALU</OPTION>
                          <OPTION VALUE="238">UCRANIA</OPTION>
                          <OPTION VALUE="239">UGANDA</OPTION>
                          <OPTION VALUE="240">URUGUAY</OPTION>
                          <OPTION VALUE="241">UZBEKISTÁN</OPTION>
                          <OPTION VALUE="242">VANUATU</OPTION>
                          <OPTION VALUE="243">VENEZUELA</OPTION>
                          <OPTION VALUE="244">VIETNAM</OPTION>
                          <OPTION VALUE="245">WALLIS Y FUTUNA</OPTION>
                          <OPTION VALUE="246">YEMEN</OPTION>
                          <OPTION VALUE="247">YIBUTI</OPTION>
                          <OPTION VALUE="248">ZAMBIA</OPTION>
                          <OPTION VALUE="249">ZIMBABUE</OPTION>`
    );
  }
}
function validarApellidoCasada(apeCasada) {
  for (let i = 0; i < apeCasada.length; i++) {
    $(apeCasada[i]).on("focusout", function () {
      let ac = $(this).val().trim();
      if (
        (ac[0] == "D" && ac[1] == "E" && ac[2] === " ") ||
        (ac[0] == "d" && ac[1] == "e" && ac[2] === " ") ||
        (ac[0] == "D" && ac[1] == "e" && ac[2] === " ") ||
        (ac[0] == "d" && ac[1] == "E" && ac[2] === " ")
      ) {
        $(this).focus();
        $(this).select();
        $(this).addClass("is-invalid");
      } else {
        $(this).removeClass("is-invalid");
      }
    });
  }
}

function validarNit(listaNit) {
  for (let i = 0; i < listaNit.length; i++) {
    $(listaNit[i]).on("focusout", function (event) {
      let nit = $(this).val().trim();
      let divinvalidTooltip = templateInvalidTooltip("Ingresa un NIT valido");
      if (nitIsValid(nit)) {
        // el nit es valido
        $(this).removeClass("is-invalid");
        $(this).parent().find(divinvalidTooltip).remove();
      } else {
        // el nit no es valido
        $(this).addClass("is-invalid");
        $(this).parent().append(divinvalidTooltip);
        $(this).val(null);
      }
    });
  }
}
function nitIsValid(nit) {
  if (!nit) {
    return true;
  }

  let nitRegExp = new RegExp("^[0-9]+(-?[0-9kK])?$");

  if (!nitRegExp.test(nit)) {
    return false;
  }

  nit = nit.replace(/-/, "");
  let lastChar = nit.length - 1;
  let number = nit.substring(0, lastChar);
  let expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

  let factor = number.length + 1;
  let total = 0;

  for (let i = 0; i < number.length; i++) {
    let character = number.substring(i, i + 1);
    let digit = parseInt(character, 10);

    total += digit * factor;
    factor = factor - 1;
  }

  let modulus = (11 - (total % 11)) % 11;
  let computedChecker = modulus == 10 ? "k" : modulus.toString();

  return expectedCheker === computedChecker;
}
function cargarCondicionMigratoria(selectCondicionMigratoria) {
  for (let i = 0; i < selectCondicionMigratoria.length; i++) {
    $(selectCondicionMigratoria[i]).empty();
    $(selectCondicionMigratoria[i]).append(
      '<option value="" disabled selected>Selecciona</option>'
    );
    $(selectCondicionMigratoria[i]).append(
      `                                <option value="1"> Residente temporal </option>
                                <option value="2"> Residente Permanente </option>
                                <option value="3"> Turista o visitante </option>
                                <option value="4"> Permiso de trabajo </option>
                                <option value="5"> Persona en tránsito </option>
                                <option value="6"> Permiso consular o similar </option>
                                <option value="7"> Nacionalizado/naturalizado en Guatemala </option>
                                <option value="8"> Otra </option>`
    );

    habilitaOtraCondicionMigratoria($(selectCondicionMigratoria[i]));
  }
}
function getMunicipios(callback, idDepto) {
  $.get(`/departamentos/municipios/${idDepto}`, function (res, sta) {
    callback(res);
  });
}
function getMoneda(callback) {
  $.get(`/moneda/listamonedas`, function (res, sta) {
    callback(res);
  });
}

function getPaises(callback) {
  $.get(`/pais/obtenerpaises`, function (res, sta) {
    callback(res);
  });
}
function getCondicionMigratoria(callback) {
  $.get(`/listacondicionmigratoria`, function (res, sta) {
    callback(res);
  });
}
function getDepartamentos(callback) {
  $.get(`/departamento/obtenerdepartamento`, function (res, sta) {
    callback(res);
  });
}

function habilitaOtroCampoDesdeSelect(inputSelect, opcionSelect) {
  // la funcion recibe uno o varios objetos select select.nombreclase  o select#id
  // opcionSelect, es la opcion que habilita el campo otroCondicionmigratoria, otroParentesco, etc. recibe el value otro del select
  // input habilitar puede recibir input.nommbreClase o input#id
  for (let a = 0; a < inputSelect.length; a++) {
    $(inputSelect[a]).change(function (event) {
      // la variable inputActual se utiliza, cuando se envia una input.nombreClase
      const inputOtro = $(this).attr("targetOtro");
      let inputActual = $(this)
        .parent()
        .parent()
        .parent()
        .find(`input.${inputOtro}`);
      if (inputActual.length != 0) {
        if (event.target.value == opcionSelect) {
          $(inputActual).prop("disabled", false);
          $(inputActual).parent().find("label>span").removeClass("oculto");
        } else {
          $(inputActual).prop("disabled", true);
          $(inputActual).parent().find("label>span").addClass("oculto");
          $(inputActual).val(null);
        }
      } else {
        console.log("no se encotro el input");
      }
    });
  }
}
function habilitaOtraCondicionMigratoria(condicionMigratoria) {
  $(condicionMigratoria).on("change", function (event) {
    const otraCondicionMigratoria = $(this)
      .parent()
      .parent()
      .parent()
      .find("input.otraCoMi");
    const spanLabel = $(otraCondicionMigratoria).parent().find("label>span");
    if (event.target.value == 8) {
      $(otraCondicionMigratoria).prop("disabled", false);
      $(spanLabel).removeClass("oculto");
    } else {
      $(otraCondicionMigratoria).prop("disabled", true);
      $(spanLabel).addClass("oculto");
      $(otraCondicionMigratoria).val(null);
    }
  });
}
function habilitaPaisPasaporte(pasaportes) {
  for (let i = 0; i < pasaportes.length; i++) {
    $(pasaportes[i]).change(function (event) {
      let divPadre = $(this).parent().parent().parent();
      let selectPaisPasaporte = $(divPadre).find("select.emicionPasaporte");
      let inputDocumento = $(divPadre).find("input.noDocIdentificacion");
      if (event.target.value == "P") {
        selectPaisPasaporte[0].disabled = false;
        $(selectPaisPasaporte)
          .parent()
          .parent()
          .find("label>span")
          .removeClass("oculto");
        inputDocumento[0].disabled = false;
      } else {
        selectPaisPasaporte[0].disabled = true;

        $(selectPaisPasaporte)
          .parent()
          .parent()
          .find("label>span")
          .addClass("oculto");
        inputDocumento[0].disabled = false;
        cargarPais(selectPaisPasaporte);
      }
    });
  }
}

function templateEntidad(id) {
  const tme = $(`<label for="entidad${id}">Entidad <span>*</span></label>
                   <input name="entidad${id}" id="entidad${id}" type="text" class="form-control" placeholder="Entidad ..." maxlength="400" required>`);
  return templateFormGroup(tme);
}
function templatePuestoDesempenia(id) {
  const tpd = $(`<label for="puestoDesepenia${id}">Puesto que desempeña <span>*</span></label>
                   <input name="puestoDesepenia${id}" id="puestoDesepenia${id}" type="text" class="form-control" placeholder="Puesto que desempeña ..." maxlength="200" required>`);
  return templateFormGroup(tpd);
}
function templateOrigenRiqueza(id) {
  let tor = $(`
                    <label for= "origenRiqueza${id}">Origen o procedencia de su riqueza <span>*<span></label>
                    <select name="origenRiqueza${id}" id="origenRiqueza${id}" class="form-control custom-select select2 origenRiqueza" style="width: 100%;" required>
                        <option value="" disabled selected>Selecciona</option>
                        <option value="1">Bienes muebles e inmuebles por herencia</option>
                        <option value="2">Bienes muebles e inmuebles</option>
                        <option value="3">Negocio propio</option>
                        <option value="4">Servicios profesionales</option>
                        <option value="5">Préstamos bancarios</option>
                        <option value="6">Trabajos anteriores</option>
                        <option value="7">Trabajo actual</option>
                        <option value="8">otro</option>
                    </select>`);

  tor = templateFormGroup(tor);
  let selectTor = $(tor).find(`select#origenRiqueza${id}`);
  $(selectTor).select2();
  habilitaOtroOrigenriqueza(selectTor);
  return tor;
}
function templateOtroOrigenRiqueza(id) {
  const toor = $(`
                    <label id="otroOrigenRiqueza${id}">Especifique <span class="oculto">*</span></label>
                    <input name="otroOrigenRiqueza${id}" id="otroOrigenRiqueza${id}" type="text" class="form-control otroOrigenRiqueza" placeholder="Origen o procedencia de su riqueza ..." maxlength="100" required disabled>`);
  return templateFormGroup(toor);
}
function verificarPersonaPep(radioClientePep) {
  for (let i = 0; i < radioClientePep.length; i++) {
    $(radioClientePep[i]).change(function () {
      /**
       * utilizo el atributo name, del input radio pepCliente para establecer el id unicao para cada campo id
       * cuando el titular el id sera entidadpepCliente_1 entidad${id}
       */
      let id = $(this).attr("name");
      const entidad = templateEntidad(id);
      const puestoDesempenia = templatePuestoDesempenia(id);
      const paisEntidad = templatePais(
        `paisEntidad${id}`,
        "País entidad",
        false,
        "otroOrigenRiqueza",
        false
      );
      const origenRiqueza = templateOrigenRiqueza(id);
      const otroOrigenRiqueza = templateOtroOrigenRiqueza(id);
      if ($(this).val() != "N") {
        var rowUno = $(`<div class="row"></div>`);
        $(rowUno).append(entidad);
        $(rowUno).append(puestoDesempenia);
        $(`.datos${id}`).append(rowUno);

        var rowDos = $(`<div class="row"></div>`);
        $(rowDos).append(paisEntidad);
        $(rowDos).append(origenRiqueza);
        $(rowDos).append(otroOrigenRiqueza);
        $(`.datos${id}`).append(rowDos);
      } else {
        $(`.datos${id} div`).remove();
      }
    });
  }
}

function habilitaOtroOrigenriqueza(selectOrigenRiqueza) {
  for (let i = 0; i < selectOrigenRiqueza.length; i++) {
    $(selectOrigenRiqueza[i]).change(function (event) {
      let otraselectOrigenRiqueza = $(this)
        .parent()
        .parent()
        .parent()
        .find("input.otroOrigenRiqueza");
      if (event.target.value == 8) {
        $(otraselectOrigenRiqueza).prop("disabled", false);
        $(otraselectOrigenRiqueza)
          .parent()
          .find("label>span")
          .removeClass("oculto");
      } else {
        $(otraselectOrigenRiqueza).prop("disabled", true);
        $(otraselectOrigenRiqueza).val(null);
        $(otraselectOrigenRiqueza)
          .parent()
          .find("label>span")
          .addClass("oculto");
      }
    });
  }
}
function eliminarTemplateNacionalidad(divButton) {
  $(divButton)
    .find("button")
    .click(function () {
      $(this).parent().parent().parent().remove();
    });
}
function agregarTemplateNacionalidad(arrBtnsAgregarNacionalidad) {
  for (let i = 0; i < arrBtnsAgregarNacionalidad.length; i++) {
    $(arrBtnsAgregarNacionalidad[i]).click(function () {
      let divPadre = $(this).parent().parent();
      let idPadre = $(divPadre).attr("id");
      let id = $(divPadre).attr("cantidad");
      id++;
      let idSelect = `${idPadre}_${id}`;
      $(`#${idPadre}>div:nth-last-child(2)`).after(
        `<div class='form-group'>
                            <div class="row">
                                <div class="col-sm">
                                    <select name="${idPadre}" id="${idSelect}" class="form-control custom-select nacionalidad select2" style="width: 100%" required>
                                        <option value="" disabled selected>Selecciona</option>
                                    </select>
                                </div>
                                <div class="col-sm my-auto">
                                    <button type="button" class="btn btn-danger">Borrar</button>
                                </div>
                            </div>
                        </div>`
      );
      $(divPadre).attr("cantidad", id);
      eliminarTemplateNacionalidad(`#${idPadre}>div.form-group>div.row`);

      let selectPaisActual = $(`#${idPadre}>div.form-group>div.row`).find(
        `select#${idSelect}`
      );
      $(selectPaisActual).select2();
      cargarPais(selectPaisActual);
    });
  }
}
function eliminarTemplateTelefono(divBorrar) {
  $(divBorrar)
    .find("button")
    .click(function () {
      $(this).parent().parent().parent().remove();
    });
}
function agregarTemplateTelefono(arrBtnAgregarTelefono) {
  for (let i = 0; i < arrBtnAgregarTelefono.length; i++) {
    $(arrBtnAgregarTelefono[i]).click(function () {
      let divPadre = $(this).parent().parent();
      let idDivPadre = $(divPadre).attr("id");
      let idSelect = $(divPadre).attr("cantidad");
      idSelect++;
      let idInput = `${idDivPadre}_${idSelect}`;
      let cmTelefono = templateTelefono(idInput, true);
      $(`#${idDivPadre}>div:nth-last-child(2)`).after(cmTelefono);
      $(cmTelefono).find(`input`).focus();
      $(divPadre).attr("cantidad", idSelect);
      eliminarTemplateTelefono($(`#${idDivPadre}>div.form-group>div.row`));
    });
  }
}

function templateParentesco(id) {
  let tmP = ` <label for="parentesco${id}">Parentesco <span>*</span></label>
                <select name="parentesco${id}" id="parentesco${id}" class="form-control custom-select parentesco select2" targetOtro="otroParentesco" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="1">Padre</option>
                    <option value="2">Madre</option>
                    <option value="3">Hijo</option>
                    <option value="4">Hermano</option>
                    <option value="5">Cónyuge</option>
                    <option value="6">Otro</option>
                </select>`;
  tmP = templateFormGroup(tmP);
  const selectParentesco = $(tmP).find(`select#parentesco${id}`);
  $(selectParentesco).select2();
  habilitaOtroCampoDesdeSelect(selectParentesco, 6);
  return tmP;
}
function templateMotivoAsociacion(id) {
  let tM = `  <label for="motivoAsociacion${id}">Motivo asociación <span>*</span></label>
                <select name="motivoAsociacion${id}" id="motivoAsociacion${id}" class="form-control custom-select motivoAsociacion select2" targetOtro="otroMotivoAsociacion" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="1">Profesionales</option>
                    <option value="2">Políticos</option>
                    <option value="3">Comerciales</option>
                    <option value="4">Negocios</option>
                    <option value="5">Otros</option>
                </select>`;
  tM = templateFormGroup(tM);
  const selectMotivo = $(tM).find(`select#motivoAsociacion${id}`);
  $(selectMotivo).select2();
  habilitaOtroCampoDesdeSelect(selectMotivo, 5);
  return tM;
}
function templateCondicion(id) {
  let tC = `<label for="condicion${id}">Condición <span>*</span></label>
                <select name="condicion${id}" id="condicion${id}" class="form-control custom-select select2" style="width: 100%" required>
                    <option value="">Selecciona</option>
                    <option value="N">Nacional</option>
                    <option value="E">Extranjero</option>
                </select>`;
  tC = templateFormGroup(tC);
  $(tC).find("select").select2();
  return tC;
}

function templateRowUnoAsoPep(id) {
  let rowUno = $(`<div class="row"><div>`);
  const cmParentesco = templateParentesco(id);
  const cmOtroParentesco = templateInputText(
    id,
    "otroParentesco",
    100,
    "Especifique",
    true,
    true
  );
  const cmMotivoAsociacion = templateMotivoAsociacion(id);
  const cmOtroMotivoAsociacion = templateInputText(
    id,
    "otroMotivoAsociacion",
    100,
    "Especifique",
    true,
    true
  );
  const cmSexo = templateSexo(id);
  const cmCondicion = templateCondicion(id);
  $(rowUno).append(cmParentesco);
  $(rowUno).append(cmOtroParentesco);
  $(rowUno).append(cmMotivoAsociacion);
  $(rowUno).append(cmOtroMotivoAsociacion);
  $(rowUno).append(cmSexo);
  $(rowUno).append(cmCondicion);
  return rowUno;
}

function templateRowTresAsoPep(id) {
  const cmEntidad = templateEntidad(id);
  const cmPuestoDesepenia = templateInputText(
    id,
    "puestoDesempenia",
    200,
    "Puesto que desempeña",
    true,
    false
  );
  const cmPaisEntidad = templatePais(
    `pais${id}`,
    "País de la institución o entidad",
    false
  );
  let rowTres = $(`<div class="row"><div>`);
  $(rowTres).append(cmEntidad);
  $(rowTres).append(cmPuestoDesepenia);
  $(rowTres).append(cmPaisEntidad);
  return rowTres;
}
function agregaAsoPep(idAsoPep) {
  let indiceAsociadosAgregados = $(`#datos${idAsoPep}>div.info`).attr(
    "cantidad"
  );
  indiceAsociadosAgregados++;
  // para el id unico del pariente asociado pep se utiliza el paramento idAsopep, obtenido del atributo name del radio button
  // eje: asoPepCliente_1 concatenado con el numero de asocado obtenido en la variable indiceAsociadosAgregados
  // al concatenar queda asoPepCliente_1_1 en el siguiente asoPepCliente_1_2 susesivamente se asignara a la variable id
  let id = `${idAsoPep}_${indiceAsociadosAgregados}`;
  // recuerda implementar las validaciones en los campos, ya  que los templates solo debuelven la estructura de html
  let rowCamposNombresAsoPep = templateCamposNommbres(id);

  let templateAsocPep = $(` <div class="card card-primary" id=${id}>
                                <div class="card-header">
                                    <h3 class="card-title">Familiar Asociado ${indiceAsociadosAgregados}</h3>
                                    <div class="card-tools">
                                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <button type="button" class="btn btn-tool" data-card-widget="remove">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                                </div>
                                <div class="card-body"></div>
                                </div>`);
  if ($(`#datos${idAsoPep}>div.info`).children().length == 0) {
    $(templateAsocPep).find("button")[1].remove();
  }
  const uno = templateRowUnoAsoPep(id);
  const tres = templateRowTresAsoPep(id);
  $(templateAsocPep).find(`div.card-body`).append(uno);
  $(templateAsocPep).find(`div.card-body`).append(rowCamposNombresAsoPep);
  $(templateAsocPep).find(`div.card-body`).append(tres);
  $(`#datos${idAsoPep}>div.info`).attr("cantidad", indiceAsociadosAgregados);
  $(`#datos${idAsoPep}>div.info`).append(templateAsocPep);
  $(`#datos${idAsoPep}>div.info`).find(`select#parentesco${id}`).focus();
}
function btnaddfamasopep(btn) {
  $(btn).click(function () {
    agregaAsoPep($(this).attr("name"));
  });
}

function verificarAsoPep(asoPepCliente) {
  for (let i = 0; i < asoPepCliente.length; i++) {
    $(asoPepCliente[i]).change(function () {
      let idAsoPep = $(this).attr("name");
      if (this.value != "N") {
        let buttonAgregarParienteAsociado = `
                                <div class="row">
                                    <div class="col-sm">
                                        <div class="form-group">
                                            <button type="button" class="btn btn-primary agregarFamiliarAsociado" id="agregarFamiliarAsociadoPep${idAsoPep}">
                                                Agregar Familiar/Asociado PEP
                                            </button>
                                        </div>
                                    </div>
                                </div>`;
        $(`#datos${idAsoPep}>div.btnadd`).append(buttonAgregarParienteAsociado);
        agregaAsoPep(idAsoPep);
        $(`#datos${idAsoPep}`)
          .find("button.agregarFamiliarAsociado")
          .click(function () {
            agregaAsoPep(idAsoPep);
          });
      } else {
        $(`#datos${idAsoPep}>div.btnadd`).children().remove();
        $(`#datos${idAsoPep}>div.info`).children().remove();
      }
    });
  }
}
function validarTipoFuenteIngreso(fuenteIngresos) {
  $(fuenteIngresos).change(function () {
    let divRowFntIng = $(this).parent().parent().parent();
    let label = $(divRowFntIng).find("label");
    let input = $(divRowFntIng).find("input");
    $(input).prop("disabled", false);
    switch ($(this).val()) {
      case "NP":
        $(label).text("Nombre comercial ");
        $(label).append("<span>*</span>");
        $(input)
          .attr("placeholder", "Nombre comercial ...")
          .attr("maxlength", "400")
          .attr("name", "nombreComercial");
        break;
      case "RD":
        $(label).text("Nombre empleador ");
        $(label).append("<span>*</span>");
        $(input)
          .attr("placeholder", "Nombre empleador ...")
          .attr("maxlength", "200")
          .attr("name", "nombreEmpleador");
        break;
      case "OI":
        $(label).text("Otras fuentes de ingreso ");
        $(label).append("<span>*</span>");
        $(input)
          .attr("placeholder", "Otra fuente ...")
          .attr("maxlength", "400")
          .attr("name", "otrasFuentesIngresos");
        break;
    }
  });
}
function agregarTemplateFuenteIngresos(btnFuenteIngreso) {
  console.log("agregando fuente de ingresos");
  $(btnFuenteIngreso).click(function () {
    const divPadre = $(this).parent().parent().parent().attr("id");
    const divContenedor = $(`div#${divPadre} >div:nth-child(2)`);
    const id = $(divContenedor).attr("id");
    let posicion = $(divContenedor).attr("cantidad");
    posicion++;
    let cFuIn = templateCamposFuenteIngreso(id, posicion);
    $(divContenedor).append(cFuIn);
    $(divContenedor).attr("cantidad", posicion);
  });
}
function templateCalidadActua(id, tipo) {
  if (tipo == "OtrosFirmantes") {
    tipo = "otros firmantes";
  }
  let cmCA = $(`
                    <div class="row mb-3"><h4>I. TIPO DE ACTUACIÓN DEL ${tipo.toUpperCase()}</h4></div>
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-check">
                                <div>
                                    <label>El cliente actúa en nombre propio <span>*</span></label>
                                </div>
                                <div class="icheck-primary d-inline">
                                    <input type="radio" id="siActua${id}" class="actuaNombrePropio form-check-input" name="tipoActuacion${id}" value="C" required/>
                                    <label for="siActua${id}">Sí</label>
                                </div>
                                <div class="icheck-primary d-inline">
                                    <input type="radio" id="noActua${id}" class="actuaNombrePropio form-check-input" name="tipoActuacion${id}" value="R" required />
                                    <label for="noActua${id}">No</label>
                                    <div class="invalid-tooltip">Indica el tipo de actuación</div>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-8">
                            <div class="form-group">
                                <label for ="calidadActua${id}" >Calidad con que actúa <span class="oculto">*</span></label>
                                <input name="calidadActua${id}" id="calidadActua${id}" type="text" class="form-control calidadActuaCliente" placeholder="Calidad con que actúa ..." maxlength="100" disabled />
                                <div class="invalid-tooltip">Por Ejemplo: Mandatario, Patria potestad, Tutor, Otros.</div>
                            </div>
                        </div>
                    </div>`);
  const inputAcNomPro = $(cmCA).find("input.actuaNombrePropio");
  verificaActuaNombrePropio(inputAcNomPro);
  return cmCA;
}
function templateLugarCM(id) {
  let camposLugar = $(`   <div class="row lugarFecha">
                                <div class="col-sm-12 mb-3">
                                    <h4>II. LUGAR Y FECHA</h4>
                                </div>
                            </div>`);

  let cmpaisTitular = templatePais(`paisCaMi${id}`, "País", true);
  $(camposLugar).append(cmpaisTitular);

  let cmDepartamentoTitular = templateDepartamento(`CaMi${id}`, "Departamento");
  $(camposLugar).append(cmDepartamentoTitular);

  let cmMunicipioTitular = templateMunicipio(`CaMi${id}`, "Municipio");
  $(camposLugar).append(cmMunicipioTitular);

  let cmFechaDoc = templateFecha(id, "DocCaMi", "");
  $(camposLugar).append(cmFechaDoc);

  return camposLugar;
}
function templateCamposMinimos(id, indice, tipo) {
  let cm = $(`
                <div class="card card-primary" id="${id}">
                    <div class="card-header">
                        <h3 class="card-title">${tipo} ${indice}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>
                `);
  eliminarCard($(cm));
  let dCardBody = $(cm).find("div.card-body");
  $(dCardBody).append(templateCalidadActua(id, tipo));
  $(dCardBody).append(templateLugarCM(id));

  let cmCM = $(`<div id="camposMinimos${id}"></div>`);
  let cmClie = templateDatosPersonales(id, "cliente");
  $(cmCM).append(cmClie);
  $(dCardBody).append(cmCM);
  if (tipo != "OtrosFirmantes") {
    let cmIE = $(`<div id="informacionEconomicaIncial${id}"></div>`);
    $(cmIE).append(templateInformacionEconomicaInicial(id));
    $(dCardBody).append(cmIE);
  }
  let cmRe = $(`<div id="representante${id}"></div>`);
  $(dCardBody).append(cmRe);
  return cm;
}
function agregarCamposMinimos(tipo, divContenedor) {
  let id = $(divContenedor).attr("cantidad");
  id++;
  let idTitular = `${tipo}_${id}`;
  let templateTitular = templateCamposMinimos(idTitular, id, tipo);
  $(divContenedor).append(templateTitular);
  $(`#${idTitular}`).find(`input#siActua${idTitular}`).focus();
  $(divContenedor).attr("cantidad", id);
}
function AgregarTitular() {
  $("#btnAgregarTitular").click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    agregarCamposMinimos("Titular", "div#titulares");
  });
}
function agregarProductoServicio(poservicio) {
  $(poservicio).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("agregando producto");
    $(`div.productoServicio`)
      .find(`button[data-card-widget=collapse]`)
      .first()
      .CardWidget("expand");
    let indexProducto = $("div#datosProductoServicio").attr("cantidad");
    indexProducto++;
    let cmProductoServicio = templateProductoServicio(indexProducto);
    $("div#datosProductoServicio").append(cmProductoServicio);
    $(cmProductoServicio)
      .find(`input#fechaProductoServicio_${indexProducto}`)
      .focus();
    $("div#datosProductoServicio").attr("cantidad", indexProducto);
  });
}
function templateSelectActualizacion() {
  let sa = $(`<label for="actualizacionPet">Tipo ingreso <span>*</span></label>
                  <select name="actualizacionPet" id="actualizacionPet" class="form-control custom-select actualizacionPet select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="I">Perfil inicial</option>
                    <option value="A">Actualización de perfil</option>
                  </select>`);
  sa = templateFormGroup(sa);
  $(sa).find("select").select2();
  return sa;
}
function templateNombreComercial(id) {
  let row = $(`<div class="row"></div>`);
  const tmNombreComercial = templateInputText(
    id,
    "nombreComercial",
    400,
    "Nombre comercial",
    true,
    false
  );
  $(row).append(tmNombreComercial);
  return row;
}
function templateRowDosNegocioPropioPet(id) {
  let row = $(`<div class="row"></div>`);
  const principalActividadEconomica = templateInputText(
    id,
    "principalActividadEconomica",
    200,
    "Principal actividad económica",
    true,
    false
  );
  const fechaInscripcionNegocio = templateFecha(
    id,
    "InscripcionNegocio",
    "de inscripción del negocio",
    "col-sm-3",
    false
  );
  $(row).append(principalActividadEconomica);
  $(row).append(fechaInscripcionNegocio);
  return row;
}
function templateInputNumber(
  id,
  tipo,
  tamanio,
  textolabel,
  requerido,
  deshabilitado
) {
  let tmNom = $(`<label>${textolabel}</label>
                   <input name="${tipo}${id}" id="${tipo}${id}" type="number" class="form-control ${tipo}" placeholder="${textolabel} ..." min="1" max="999999999999999" maxlength="${tamanio}"/>`);
  tmNom = templateFormGroup(tmNom);
  if (requerido === true) {
    $(tmNom).find(`input#${tipo}${id}`).prop("required", true);
  }
  if (deshabilitado === true) {
    $(tmNom).find(`input#${tipo}${id}`).prop("disabled", true);
  }
  return tmNom;
}
function templatePantenteComercio(id) {
  //Número de registro
  let row = $(`<div class="row"></div>`);
  $(row).append(
    templateFormGroup(`<h2>Patente de comercio de empresa</h2>`, "col-sm-12")
  );
  const numeroRegistro = templateInputNumber(
    id,
    "numeroRegistro",
    15,
    "Número de registro",
    false,
    false
  );
  const folio = templateInputNumber(id, "folio", 15, "Folio", false, false);
  const libro = templateInputNumber(id, "libro", 15, "Libro", false, false);
  $(row).append(numeroRegistro);
  $(row).append(folio);
  $(row).append(libro);
  return row;
}
function templateCamposLugarPet(id) {
  let comPais = templatePais(`paisPet${id}`, "País", true);
  let comDepartamento = templateDepartamento(`Pet${id}`, "Departamento");
  let comMunicipio = templateMunicipio(`Pet${id}`, "Municipio");
  let tempCamResidencia = $(`<div class="row"></div>`);
  $(tempCamResidencia).append(comPais);
  $(tempCamResidencia).append(comDepartamento);
  $(tempCamResidencia).append(comMunicipio);
  return tempCamResidencia;
}
function templateMontoAproximado(id, textolabel) {
  let tm = $(`<label>${textolabel} <span>*</span></label>
                <input type="number" name = "montoAproximado" class="form-control d-inline montoAproximado" placeholder="0.00"  min="0" step=".01" style="text-align:right;" required/>`);
  tm = templateFormGroup(tm, "col-sm-3");
  return tm;
}
function templateCamposMonto(id, textolabelMonto) {
  const tipoMoneda = templateMoneda(id);
  const MontoAproximado = templateMontoAproximado(id, textolabelMonto);
  let tm = $(`<div class="row"></div>`);
  $(tm).append(tipoMoneda);
  $(tm).append(MontoAproximado);
  return tm;
}
function templatePerfilnegocioPropio(id) {
  const rowuno = templateNombreComercial(id);
  const rowdos = templateRowDosNegocioPropioPet(id);
  const rowtres = templatePantenteComercio(id);
  const rowCuatro = templateDireccion(id, "Dirección negocio", "Negocio");
  const rowCinco = templateCamposLugarPet(id);
  const rowSeis = templateCamposMonto(id, "Monto aproximado ingresos");
  let tm = $(`
                <div class="card card-info mt-3" id="negocioPropio_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Negocio propio ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
  $(tm).find(`div.card-body`).append(rowuno);
  $(tm).find(`div.card-body`).append(rowdos);
  $(tm).find(`div.card-body`).append(rowtres);
  $(tm).find(`div.card-body`).append(rowCuatro);
  $(tm).find(`div.card-body`).append(rowCinco);
  $(tm).find(`div.card-body`).append(rowSeis);

  return tm;
}
function agregarPerfilEconomicoNegocioPropio(btn) {
  $(btn).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const dnp = $("div#datosNegocioPropio");
    let index = $(dnp).attr("cantidad");
    index++;
    $(dnp).append(templatePerfilnegocioPropio(index));
    $(dnp).find(`input#nombreComercial${index}`).focus();
    $(dnp).attr("cantidad", index);
  });
}
function templateContenedorNegocioPropio() {
  let tpnp = $(`<div class="row">
                    <div class="datosNegocioPropio col-sm-12" id="datosNegocioPropio" cantidad="0"></div>
                    <div class="form-group">
                        <button type="button" id="agregarNegocioPropio" class="btn btn-primary agregarNegocioPropio">Agregar negocio propio</button>
                    </div>
                  </div>`);
  const btnaddng = $(tpnp).find("button#agregarNegocioPropio");
  agregarPerfilEconomicoNegocioPropio(btnaddng);
  return tpnp;
}
function templateSelectSector(id) {
  let sa = $(`<label for="sectorPet">Sector <span>*</span></label>
                  <select name="sectorPet" id="sectorPet${id}" class="form-control custom-select sector select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="PU">Sector Público</option>
                    <option value="PR">Sector Privado</option>
                  </select>`);
  sa = templateFormGroup(sa, "col-sm-2");
  $(sa).find("select").select2();
  return sa;
}
function templateFilaUnord(id) {
  const cmSector = templateSelectSector(id);
  const cmNombreEmpleador = templateInputText(
    id,
    "NombreEmpleador",
    200,
    "Nombre del empleador",
    true
  );
  let tm = $(`<div class="row"></div>`);
  $(tm).append(cmSector);
  $(tm).append(cmNombreEmpleador);
  return tm;
}
function templateFilaDosrd(id) {
  const prinActiEcoEmple = templateInputText(
    id,
    "prinActiEcoEmple",
    200,
    `Principal actividad económica empleador`,
    true,
    false
  );
  const puestoDesempenia = templateInputText(
    id,
    "puestoDesempenia",
    200,
    "Puesto que desempeña",
    true,
    false
  );
  let tm = $(`<div class="row"></div>`);
  $(tm).append(prinActiEcoEmple);
  $(tm).append(puestoDesempenia);
  return tm;
}
function templateCamposLugarRd(id) {
  let comPais = templatePais(`paisRd${id}`, "País", true);
  let comDepartamento = templateDepartamento(`Rd${id}`, "Departamento");
  let comMunicipio = templateMunicipio(`Rd${id}`, "Municipio");
  let tempCamResidencia = $(`<div class="row"></div>`);
  $(tempCamResidencia).append(comPais);
  $(tempCamResidencia).append(comDepartamento);
  $(tempCamResidencia).append(comMunicipio);
  return tempCamResidencia;
}
function templateRelacionDependencia(id) {
  const cmRowUno = templateFilaUnord(id);
  const cmRowDos = templateFilaDosrd(id);
  const rowTres = templateCamposMonto(id, "Monto aproximado ingresos");
  const direccionEmpleador = templateDireccion(
    id,
    "Dirección empleador",
    "Empleador"
  );
  const lugarRd = templateCamposLugarRd(id);
  let tm = $(`
                <div class="card card-info mt-3" id="relacoinDependencia_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Relación de dependencia ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
  $(tm).find(`div.card-body`).append(cmRowUno);
  $(tm).find(`div.card-body`).append(cmRowDos);
  $(tm).find(`div.card-body`).append(direccionEmpleador);
  $(tm).find(`div.card-body`).append(lugarRd);
  $(tm).find(`div.card-body`).append(rowTres);
  return tm;
}
function agregarPerfilEconomicoRelacionDependencia(btn) {
  $(btn).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const drd = $("div#datosRelacionDependencia");
    let index = $(drd).attr("cantidad");
    index++;
    $(drd).append(templateRelacionDependencia(index));
    $(drd).find("select.sector").focus();
    $(drd).attr("cantidad", index);
  });
}
function templateContenedorRelacionDependencia() {
  let trd = $(`<div class="row">
                    <div class="datosRelacionDependencia col-sm-12" id="datosRelacionDependencia" cantidad="0"></div>
                    <div class="form-group">
                        <button type="button" id="agregarRelacionDependencia" class="btn btn-primary agregarRelacionDependencia">Agregar Relación de Dependencia</button>
                    </div>
                  </div>`);
  let drd = $(trd).find(`div#datosRelacionDependencia`);
  const btnaddrd = $(trd).find(`button#agregarRelacionDependencia`);
  agregarPerfilEconomicoRelacionDependencia(btnaddrd);
  return trd;
}
function templateSelectOtrosIngresos(id) {
  let sa = $(`<label for="tipoOtrosIngresosPet">Tipo de ingreso <span>*</span></label>
                  <select name="tipoOtrosIngresosPet" id="tipoOtrosIngresosPet${id}" class="form-control custom-select tipoOtrosIngresos select2" style="width: 100%" required>
                    <option value="" disabled selected>Selecciona</option>
                    <option value="1">Actividades profecionales</option>
                    <option value="2">Manutención</option>
                    <option value="3">Rentas</option>
                    <option value="4">Jubilación</option>
                    <option value="5">Otra</option>
                  </select>`);
  sa = templateFormGroup(sa, "col-sm-2");
  $(sa).find("select").select2();
  return sa;
}
function templateRowUnoOtrosIngresos(id) {
  const cmSelectOtrosIngresos = templateSelectOtrosIngresos(id);
  const cmDeatalleOtrosIngresos = templateInputText(
    id,
    "DetalleOtrosIngresos",
    400,
    "Especificar",
    true,
    false
  );
  let cmRow = $(`<div class="row"></div>`);
  $(cmRow).append(cmSelectOtrosIngresos);
  $(cmRow).append(cmDeatalleOtrosIngresos);
  return cmRow;
}

function templateOtrosIngresos(id) {
  const cmRowUno = templateRowUnoOtrosIngresos(id);
  const cmMontos = templateCamposMonto(id, "Monto aproximado ingresos");
  let tm = $(`
                <div class="card card-info mt-3" id="otrosIngresos_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Otros ingreso ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
  $(tm).find(`div.card-body`).append(cmRowUno);
  $(tm).find(`div.card-body`).append(cmMontos);
  return tm;
}
function agregarTemplateOtrosIngresos(btnaddoi) {
  $(btnaddoi).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const tmdrd = $("div#datosOtrosIngresos");
    let index = $(tmdrd).attr("cantidad");
    index++;
    $(tmdrd).append(templateOtrosIngresos(index));
    $(tmdrd).find(`select.tipoOtrosIngresos`).focus();
    $(tmdrd).attr("cantidad", index);
  });
}
function templateContenedorOtrosIngresos() {
  let trd = $(`<div class="row">
                    <div class="datosOtrosIngresos col-sm-12" id="datosOtrosIngresos" cantidad="0"></div>
                    <div class="form-group">
                        <button type="button" id="agregarOtrosIngresos" class="btn btn-primary agregarOtrosIngresos">Agregar Otros Ingresos</button>
                    </div>
                  </div>`);
  let drd = $(trd).find(`div#datosOtrosIngresos`);
  const btnaddoi = $(trd).find("button#agregarOtrosIngresos");
  agregarTemplateOtrosIngresos(btnaddoi);
  return trd;
}
function templateFinaUnoPerfilEconomicoTransaccional() {
  const cmSelectActualizacioin = templateSelectActualizacion();
  const cmFecha = templateFecha("", "Pet", "");
  let rowuno = $(`<div class="row"></div>`);
  $(rowuno).append(cmSelectActualizacioin);
  $(rowuno).append(cmFecha);
  return rowuno;
}
function templateRowUnoPSperfilTransaccional(id) {
  const fecha = templateFecha(
    id,
    "Pspt",
    "de elaboración del perfil",
    "col-sm-3",
    true
  );
  const descripcion = templateInputText(
    id,
    "productoServicioPspt",
    100,
    "Producto y/o servicio",
    true,
    false
  );
  let rowuno = $(`<div class="row"></div>`);
  $(rowuno).append(fecha);
  $(rowuno).append(descripcion);
  return rowuno;
}
function borrarUbicacionGeografica(btn) {
  $(btn).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log($(this).parent().parent().remove());
  });
}
function templateCamposLugarUbigeo(id, btnBorrar) {
  let comPais = templatePais(`paispug${id}`, "País", true);
  let comDepartamento = templateDepartamento(`pug${id}`, "Departamento");
  let comMunicipio = templateMunicipio(`pug${id}`, "Municipio");
  let divCborrar = $(`<div class="col-sm-1 my-auto btnborrar"></div>`);
  let temUbiGeo = $(`<div class="row"></div>`);
  $(temUbiGeo).append(comPais);
  $(temUbiGeo).append(comDepartamento);
  $(temUbiGeo).append(comMunicipio);
  if (btnBorrar) {
    const btnBorrar = $(
      `<button type="button" class="btn btn-danger btnUbicacionGeografica mt-3">Borrar</button>`
    );
    borrarUbicacionGeografica(btnBorrar);
    $(divCborrar).append(btnBorrar);
  }
  $(temUbiGeo).append(divCborrar);
  return temUbiGeo;
}
function agregarPUG(btn) {
  $(btn).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    const tmdrd = $(this)
      .parent()
      .parent()
      .parent()
      .find("div#ubicacionesGeoraficas");
    let index = $(tmdrd).attr("cantidad");
    let idug = $(tmdrd).attr("idug");
    index++;
    $(tmdrd).append(templateCamposLugarUbigeo(`${idug}${index}`, true));
    $(tmdrd).find(`select.pais`).focus();
    $(tmdrd).attr("cantidad", index);
  });
}
function templateProductoServicioPerfilTransaccional(id) {
  const rowuno = templateRowUnoPSperfilTransaccional(id);
  const rowdos = templateCamposMonto(id, "Monto promedio mensual (6 meses)");
  const clg = templateCamposLugarUbigeo(`${id}1`);
  const rowUbicacionesGeo = $(`<h4>Principales ubicaciones geográficas</h4>
                                 <div id="ubicacionesGeoraficas" idug=${id} cantidad="1"></div>
                                 <div class="row">
                                <div class="col clearfix">
                                <button class="btn btn-primary float-right mb-4 agregarUbicacionGeo" id="agregarUbicacionGeo${id}">Agregar ubicación</button>
                                </div>
                                </div>`);
  let tm = $(`
                <div class="card card-info mt-3" id="otrosIngresos_${id}">
                    <div class="card-header">
                        <h3 class="card-title">Producto del perfil transaccional ${id}</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button type="button" class="btn btn-tool" data-card-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                    </div>
                </div>`);
  $(tm).find(`div.card-body`).append(rowuno);
  $(tm).find(`div.card-body`).append(rowdos);
  $(tm).find(`div.card-body`).append(rowUbicacionesGeo);
  $(tm).find(`div#ubicacionesGeoraficas`).append(clg);
  const btnaddpug = $(tm).find("button.agregarUbicacionGeo");
  agregarPUG(btnaddpug);
  return tm;
}

function agregarTemplatePerfilTransaccional(btnadd) {
  $(btnadd).click(function () {
    let dpt = $(`div#datosPerfilTransaccional`);
    let index = $(dpt).attr("cantidad");
    index++;
    const cmPSPT = templateProductoServicioPerfilTransaccional(index);
    $(dpt).append(cmPSPT);
    $(dpt).find("input.Pspt").focus();
    $(dpt).attr("cantidad", index);
  });
}
function templatePerfiltransaccional() {
  let tm = $(`
                <div class="card card-primary mt-3" id="perfilTransaccional">
                    <div class="card-header">
                        <h3 class="card-title">PERFIL TRANSACCIONAL</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                <div class="row">
                    <div class="datosPerfilTransaccional col-sm-12" id="datosPerfilTransaccional" cantidad="0"></div>
                    <div class="form-group">
                            <button type="button" id="agregarPerfilTransaccional" class="btn btn-primary agregarOtrosIngresos mt-3">Agregar Producto y/o Servicio Perfil Transaccinal</button>
                    </div>
                  </div>
                    </div>
                </div>`);
  const btnadd = $(tm).find("button#agregarPerfilTransaccional");
  agregarTemplatePerfilTransaccional(btnadd);
  return $(tm);
}
function agregarPerfilEconomico(btnAgregarPerfilEconomico) {
  $(btnAgregarPerfilEconomico).click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("agregando perfil economico");
    $(`div#perfilEconomicoTransaccional`)
      .find(`button[data-card-widget=collapse]`)
      .first()
      .CardWidget("expand");
    const cmPerfilEconomico = templateFinaUnoPerfilEconomicoTransaccional();
    const cmNegocioPropio = templateContenedorNegocioPropio();
    const cmRD = templateContenedorRelacionDependencia();
    const cmCoi = templateContenedorOtrosIngresos();
    const cmPet = templatePerfiltransaccional();
    let cardBody = $("div#perfilEconomicoTransaccional").find("div.card-body");
    $(cardBody).append(cmPerfilEconomico);
    $(cardBody).append($(`<div class="row"><h2>FUENTE DE INGRESOS</h2></div>`));
    $(cardBody).append(cmNegocioPropio);
    $(cardBody).append(cmRD);
    $(cardBody).append(cmCoi);
    $(cardBody).append(cmPet);
    $(this).remove();
  });
}
class dicLugar {
  constructor() {
    this.pais = null;
    this.departamento = null;
    this.municipio = null;
  }
}
class datosPep {
  constructor(id) {
    this.idDatosPep = id;
    this.entidad = null;
    this.puestoDesempenia = null;
    this.paisEntidad = null;
    this.origenRiqueza = null;
    this.otroOrigenRiqueza = null;
  }
}
class dicParienteAsociadoPep {
  constructor(id) {
    this.idDatosParienteAsociadoPep = id;
    this.parentesco = null;
    this.otroParentesco = null;
    this.motivoAsociacion = null;
    this.otroMotivoAsociacion = null;
    this.primerApellido = null;
    this.segundoApellido = null;
    this.apellidoCasada = null;
    this.primerNombre = null;
    this.segundoNombre = null;
    this.otrosNombres = null;
    this.sexo = null;
    this.condicion = null;
    this.entidad = null;
    this.puestoDesempenia = null;
    this.paisEntidad = null;
  }
}
class dicDatosPersonales {
  constructor(id) {
    this.idDatosPersonales = id;
    this.primerApellido = null;
    this.segundoApellido = null;
    this.apellidoCasada = null;
    this.primerNombre = null;
    this.segundoNombre = null;
    this.otrosNombres = null;
    this.fechaNacimiento = null;
    this.nacionalidades = new Array();
    this.nacimiento = new dicLugar();
    this.condicionMigratoria = null;
    this.otraCondicionMigratoria = null;
    this.sexo = null;
    this.estadoCivil = null;
    this.profesionOficio = null;
    this.tipoDocumentoIdentificacion = null;
    this.numeroDocumentoIdentificacion = null;
    this.emisionPasaporte = null;
    this.nit = null;
    this.telefonos = new Array();
    this.email = null;
    this.direccionResidencia = null;
    this.residencia = new dicLugar();
    this.pep = null;
    this.datospep = new datosPep();
    this.parienteAsociadoPep = null;
    this.datosParienteAsociadoPep = new Array();
    this.cpe = null;
  }
  agregarTelefono(telefono) {
    this.telefonos.push(telefono);
  }
  agregarNacionalidad(nacionalidad) {
    this.nacionalidades.push(nacionalidad);
  }
  agregarParienteAsociadoPep(asociado) {
    this.datosParienteAsociadoPep.push(asociado);
  }
}

class informacionNegocioPropio {
  constructor(id) {
    this.idNombreComercial = id;
    this.nombreComercial = null;
  }
}
class informacionNombreEmpleador {
  constructor(id) {
    this.idNombreEmpleador = id;
    this.nombreEmpleador = null;
  }
}
class informacionOtrosIngresos {
  constructor(id) {
    this.idOtrasFuentesIngreso = id;
    this.otrasFuentesIngreso = null;
  }
}
class informacionEconomicaInicial {
  constructor(id) {
    this.idInformacionEconomicaInicial = id;
    this.montoIngresos = null;
    this.negocioPropio = new Array();
    this.relacionDependencia = new Array();
    this.otrosIngresos = new Array();
    this.propositoRC = null;
  }
  agregarNegocioPropio(npropio) {
    this.negocioPropio.push(npropio);
  }
  agregarRelacionDependencia(rDependencia) {
    this.relacionDependencia.push(rDependencia);
  }
  agregarotrosIngresos(oIngresos) {
    this.otrosIngresos.push(oIngresos);
  }
}
class dicCamposMinimos {
  constructor(id) {
    this.idCamposMinimos = id;
    this.tipoActuacion = null;
    this.calidadActua = null;
    this.lugar = new dicLugar();
    this.fecha = null;
    this.cliente = new dicDatosPersonales();
    this.representante = new dicDatosPersonales();
    this.infoEconomicaInical = new informacionEconomicaInicial();
  }
}
class dicProductoServicio {
  constructor(id) {
    this.idProductoServicio = id;
    this.lugar = new dicLugar();
    this.fecha = null;
    this.tipo = null;
    this.nombre = null;
    this.descripcion = null;
    this.identificador = null;
    this.nombreContrata = null;
    this.moneda = null;
    this.valor = null;
    this.otrosFirmantes = new Array();
    this.beneficiarios = new Array();
  }
  agregarBeneficiario(beneficiario) {
    this.beneficiarios.push(beneficiario);
  }
}
class dicPerfilEconomicoNegocioPropio {
  constructor(id) {
    this.idDiccionarioPerfilEconomicoNegocioPropio = id;
    this.nombreComercial = null;
    this.principalActividadEconomica = null;
    this.fechaInscripcionNegocio = null;
    this.numeroRegistro = null;
    this.folio = null;
    this.libro = null;
    this.direccionNegocio = null;
    this.lugar = new dicLugar();
    this.tipoMoneda = null;
    this.montoAproximado = null;
  }
}
class dicPerfilEconomicoRelacionDependencia {
  constructor(id) {
    this.idPerd = id;
    this.sector = null;
    this.nombreEmpleador = null;
    this.priActEcoE = null;
    this.puestoDesempenia = null;
    this.direccionEmpleador = null;
    this.lugar = new dicLugar();
    this.tipoMoneda = null;
    this.montoAproximado = null;
  }
}
class dicPerfilEconomicoOtrosIngresos {
  constructor(id) {
    this.idOI = id;
    this.tipoOI = null;
    this.detalleOI = null;
    this.tipoMoneda = null;
    this.montoAproximado = null;
  }
}
class dicPerfilTransaccional {
  constructor(id) {
    this.iddpet = id;
    this.fecha = null;
    this.productoServicio = null;
    this.tipoMoneda = null;
    this.montoPromedioMensual = null;
    this.pubGeo = new Array();
  }
}
class dicPerfilEconomicoTransaccional {
  constructor(id) {
    this.idPerfilEconomicoTransaccional = id;
    this.actualizacion = null;
    this.fecha = null;
    this.negocioPropio = new Array();
    this.relacionDependencia = new Array();
    this.otrosIngresos = new Array();
    this.perfilTransaccional = new Array();
  }
  agregarNegocioPropio(ngp) {
    this.negocioPropio.push(ngp);
  }
  agregarRelacionDependencia(rd) {
    this.relacionDependencia.push(rd);
  }
  agregarotrosIngresos(oi) {
    this.otrosIngresos.push(oi);
  }
  agregarPerfilTransaccional(pt) {
    this.perfilTransaccional.push(pt);
  }
}
class diccionarioFormulario {
  constructor(id) {
    this.iddiccionarioFormulario = id;
    this.titulares = new Array();
    this.productos = new Array();
    this.perfilEconomico = new Object();
  }
  agregarTitular(titular) {
    this.titulares.push(titular);
  }
  agregarPoductoServicio(servicio) {
    this.productos.push(servicio);
  }
  agregarPerfilEconomico(pEconomico) {
    this.perfilEconomico = pEconomico;
  }
}
function expandirCard() {
  let titulares = $("#titulares>div").find(`button[data-card-widget=collapse]`);
  for (let i = 0; i < titulares.length; i++) {
    $(titulares[i]).CardWidget("expand");
  }
  $(`div.productoServicio`)
    .find(`button[data-card-widget=collapse]`)
    .each(function () {
      $(this).CardWidget("expand");
    });
  $(`form#diccionarioFormulario>div`)
    .find(`button[data-card-widget=collapse]`)
    .each(function () {
      $(this).CardWidget("expand");
    });
}
function mostrarModal() {
  $("#myModal").modal({
    backdrop: "static",
    keyboard: false,
  });
}
function validarFormulario() {
  var forms = document.getElementsByClassName("needs-validation");
  var validation = Array.prototype.filter.call(forms, function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();
        event.stopPropagation();
        expandirCard();
        if (form.checkValidity() === false) {
          form.classList.add("was-validated");

          alert("No se puede guardar el formulario, verifica los campos");
          $(form).find(".form-control:invalid").first().focus();
          $(form).find(".form-check-input:invalid").first().focus();
          $(this).find("button#btnGuardar").prop("disabled", false);
          $(this).find("button#btnGuardar").html("Guardar formulario");
        } else {
          console.log("enviando formulario");
          //mostrarModal();
          $(this).find("button#btnGuardar").prop("disabled", true);
          $(this).find("button#btnGuardar").html("");
          $(this).find("button#btnGuardar").append(
            `
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Guardando formulario...
                         `
          );
          console.log($("button.btn-tool").remove());
          console.log($(".fa-calendar").parent().remove());
          $(":input").removeAttr("placeholder");
          $(":button").remove();
          $("h3").css("color", "black");
          form.classList.remove("was-validated");
          enviarDatos();
        }
      },
      false
    );
  });
}
function enviarDatos() {
  window.print();
  location.reload();
}
function eliminarCard(card) {
  for (let i = 0; i < card.length; i++) {
    $(card[i]).on("removed.lte.cardwidget", function (event) {
      let cardActual = $(event.target).parent().parent().parent();
      $(cardActual).remove();
    });
  }
}
function obtenerDiccionarioCamposMinimos(divContenedorCamposMinimos) {
  let diccionarioCamposMinimos = new Array();
  $(divContenedorCamposMinimos).each(function () {
    let id = $(this).attr("id");
    let idCamposMinimos = $(this).attr("idCamposMinimos");
    let camposMinimos = new dicCamposMinimos(idCamposMinimos);
    camposMinimos.tipoActuacion = $(this)
      .find(`input:radio[name=tipoActuacion${id}]:checked`)
      .val();
    if (camposMinimos.tipoActuacion === "R") {
      camposMinimos.calidadActua = $(this)
        .find(`input:text[id=calidadActua${id}]`)
        .val();
      let daPeRepre = $(this).find(`div#representante${id}`);
      //idrepresentante
      const idrepresentante = $(`div#representante${id}`).attr(
        "idrepresentante"
      );
      camposMinimos.representante = obtenerDatosPersonales(
        daPeRepre,
        `Representante${id}`,
        idrepresentante
      );
    } else {
      camposMinimos.representante = null;
    }
    camposMinimos.lugar.pais = $(this)
      .find(`select[id=paisCaMi${id}] option:selected`)
      .val();
    if (camposMinimos.lugar.pais === "1") {
      camposMinimos.lugar.departamento = $(this)
        .find(`select[id=deptoCaMi${id}] option:selected`)
        .val();
      camposMinimos.lugar.municipio = $(this)
        .find(`select[id=muniCaMi${id}] option:selected`)
        .val();
    }
    camposMinimos.fecha = $(this)
      .find(`input:text[id=fechaDocCaMi${id}]`)
      .val();
    let daPeCliente = $(this).find(`div#camposMinimos${id}`);
    const idDatosPersonales = $(`#camposMinimos${id}`).attr("idatospersonales");
    camposMinimos.cliente = obtenerDatosPersonales(
      daPeCliente,
      id,
      idDatosPersonales
    );
    const divInfoEconomica = $(this).find(
      `div#informacionEconomicaIncial${id}`
    );
    const idinformacioniconomicainicial = $(
      `#informacionEconomicaIncial${id}`
    ).attr("idinformacioniconomicainicial");
    camposMinimos.infoEconomicaInical = obtenerDatosInfoEconomica(
      divInfoEconomica,
      id,
      idinformacioniconomicainicial
    );
    diccionarioCamposMinimos.push(camposMinimos);
  });
  return diccionarioCamposMinimos;
}
function obtenerDatosPersonales(divPadre, id, idDatosPersonales) {
  let datosPersonales = new dicDatosPersonales(idDatosPersonales);
  datosPersonales.primerApellido = $(divPadre)
    .find(`input:text[id=primerApellido${id}]`)
    .val();
  datosPersonales.segundoApellido = $(divPadre)
    .find(`input:text[id=segundoApellido${id}]`)
    .val();
  datosPersonales.apellidoCasada = $(divPadre)
    .find(`input:text[id=apellidoCasada${id}]`)
    .val();
  datosPersonales.primerNombre = $(divPadre)
    .find(`input:text[id=primerNombre${id}]`)
    .val();
  datosPersonales.segundoNombre = $(divPadre)
    .find(`input:text[id=segundoNombre${id}]`)
    .val();
  datosPersonales.otrosNombres = $(divPadre)
    .find(`input:text[id=otrosNombres${id}]`)
    .val();
  datosPersonales.fechaNacimiento = $(divPadre)
    .find(`input:text[id=fechaNacimiento${id}]`)
    .val();
  datosPersonales.nacimiento.pais = $(divPadre)
    //
    .find(`select[id=paisNacimiento${id}] option:selected`)
    .val();
  datosPersonales.nacimiento.departamento = $(divPadre)
    .find(`select[id=deptoNacimiento${id}] option:selected`)
    .val();
  datosPersonales.nacimiento.municipio = $(divPadre)
    .find(`select[id=muniNacimiento${id}] option:selected`)
    .val();
  datosPersonales.condicionMigratoria = $(divPadre)
    .find(`select[id=condicionMigratoria${id}] option:selected`)
    .val();
  datosPersonales.otraCondicionMigratoria = $(divPadre)
    .find(`input:text[id=otraCoMi${id}]`)
    .val();
  datosPersonales.sexo = $(divPadre)
    .find(`select[id=sexo${id}] option:selected`)
    .val();
  datosPersonales.estadoCivil = $(divPadre)
    .find(`select[id=estadoCivil${id}] option:selected`)
    .val();
  datosPersonales.nit = $(divPadre).find(`input:text[id=nit${id}]`).val();
  datosPersonales.tipoDocumentoIdentificacion = $(divPadre)
    .find(`select[id=tipoDoctoIdentificacion${id}] option:selected`)
    .val();
  datosPersonales.numeroDocumentoIdentificacion = $(divPadre)
    .find(`input:text[id=noDocIdentificacion${id}]`)
    .val();
  datosPersonales.emisionPasaporte = $(divPadre)
    .find(`select[id=emicionPasaporte${id}] option:selected`)
    .val();
  datosPersonales.profesionOficio = $(divPadre)
    .find(`input:text[id=profecionOficio${id}]`)
    .val();
  datosPersonales.email = $(divPadre).find(`input[id=email${id}]`).val();
  datosPersonales.direccionResidencia = $(divPadre)
    .find(`input:text[id=direccionRecidencia${id}]`)
    .val();
  datosPersonales.residencia.pais = $(divPadre)
    .find(`select[id=paisRecidencia${id}] option:selected`)
    .val();
  datosPersonales.residencia.departamento = $(divPadre)
    .find(`select[id=deptoRecidencia${id}] option:selected`)
    .val();
  datosPersonales.residencia.municipio = $(divPadre)
    .find(`select[id=muniRecidencia${id}] option:selected`)
    .val();
  let telefonos = $(`div#telefono${id}`).find("input.telefono");
  for (let i = 0; i < telefonos.length; i++) {
    datosPersonales.agregarTelefono($(telefonos[i]).val());
  }

  let nacionalidades = $(`div#nacionalidad${id}`).find(`select.nacionalidad`);
  for (let a = 0; a < nacionalidades.length; a++) {
    datosPersonales.agregarNacionalidad($(nacionalidades[a]).val());
  }
  datosPersonales.cpe = $(divPadre)
    .find(`input:radio[name=cpe${id}]:checked`)
    .val();
  let esPep = (datosPersonales.pep = $(divPadre)
    .find(`input:radio[name=pep${id}]:checked`)
    .val());
  if (esPep === "S") {
    datosPersonales.datospep.idDatosPep = $(`input[id=idDatosPep${id}]`).val();
    datosPersonales.datospep.entidad = $(divPadre)
      .find(`input[id=entidadpep${id}]`)
      .val();
    datosPersonales.datospep.puestoDesempenia = $(divPadre)
      .find(`input[id=puestoDesepeniapep${id}]`)
      .val();
    datosPersonales.datospep.paisEntidad = $(divPadre)
      .find(`select[id=paisEntidadpep${id}] option:selected`)
      .val();
    let esOtroRiqueza = (datosPersonales.datospep.origenRiqueza = $(divPadre)
      .find(`select[id=origenRiquezapep${id}] option:selected`)
      .val());
    if (esOtroRiqueza == 8) {
      datosPersonales.datospep.otroOrigenRiqueza = $(divPadre)
        .find(`input[id=otroOrigenRiquezapep${id}]`)
        .val();
    }
  } else {
    datosPersonales.datospep = null;
  }

  let esAsoPep = (datosPersonales.parienteAsociadoPep = $(divPadre)
    .find(`input:radio[name=asoPep${id}]:checked`)
    .val());

  if (esAsoPep == "S") {
    let asociados = $(`#datosasoPep${id}>div.info`).children();
    for (let a = 0; a < asociados.length; a++) {
      // obtenemos el id, del div que contiene los datos del asociado actual
      // div#asoPepCliente_1_0 para buscar cada input con
      // $(`div#asoPepCliente_1_0`).find(`select#parentescoasoPepCliente_1_0`).val();

      let idAsociado = $(asociados[a]).attr("id");
      let idDatosParienteAsociadoPep = $(asociados[a]).attr(
        "idDatosParienteAsociadoPep"
      );

      let datosAsoPep = new dicParienteAsociadoPep(idDatosParienteAsociadoPep);
      let divactual = `div#${idAsociado}`;
      datosAsoPep.parentesco = $(divactual)
        .find(`select#parentesco${idAsociado}`)
        .val();
      datosAsoPep.otroParentesco = $(divactual)
        .find(`input#otroParentesco${idAsociado}`)
        .val();
      datosAsoPep.motivoAsociacion = $(divactual)
        .find(`select#motivoAsociacion${idAsociado}`)
        .val();
      datosAsoPep.otroMotivoAsociacion = $(divactual)
        .find(`input#otroMotivoAsociacion${idAsociado}`)
        .val();
      datosAsoPep.sexo = $(divactual).find(`select#sexo${idAsociado}`).val();
      datosAsoPep.condicion = $(divactual)
        .find(`select#condicion${idAsociado}`)
        .val();
      datosAsoPep.primerApellido = $(divactual)
        .find(`input#primerApellido${idAsociado}`)
        .val();
      datosAsoPep.segundoApellido = $(divactual)
        .find(`input#segundoApellido${idAsociado}`)
        .val();
      datosAsoPep.apellidoCasada = $(divactual)
        .find(`input#apellidoCasada${idAsociado}`)
        .val();
      datosAsoPep.primerNombre = $(divactual)
        .find(`input#primerNombre${idAsociado}`)
        .val();
      datosAsoPep.segundoNombre = $(divactual)
        .find(`input#segundoNombre${idAsociado}`)
        .val();
      datosAsoPep.otrosNombres = $(divactual)
        .find(`input#otrosNombres${idAsociado}`)
        .val();
      datosAsoPep.entidad = $(divactual)
        .find(`input#entidad${idAsociado}`)
        .val();
      datosAsoPep.puestoDesempenia = $(divPadre)
        .find(`input#puestoDesempenia${idAsociado}`)
        .val();
      datosAsoPep.paisEntidad = $(divPadre)
        .find(`select#pais${idAsociado}`)
        .val();
      datosPersonales.agregarParienteAsociadoPep(datosAsoPep);
    }
  } else {
    datosPersonales.datosParienteAsociadoPep = null;
  }

  return datosPersonales;
}
function obtenerDatosInfoEconomica(
  infoEconomica,
  id,
  idinformacioniconomicainicial
) {
  let infoEc = new informacionEconomicaInicial(idinformacioniconomicainicial);
  infoEc.montoIngresos = $(infoEconomica)
    .find(`input[id=montoIngresos${id}]`)
    .val();
  infoEc.propositoRC = $(infoEconomica)
    .find(`input:text[id=propositoRC${id}]`)
    .val();

  let fuenteIngresos = $(infoEconomica).find(`div#fuenteingresos${id}`);
  $(fuenteIngresos)
    .children()
    .each(function (elemento) {
      switch ($(this).find(`input`).attr("name")) {
        case "nombreComercial":
          let ngp = new informacionNegocioPropio();
          ngp.nombreComercial = $(this).find(`input`).val();
          infoEc.agregarNegocioPropio(ngp);
          break;
        case "nombreEmpleador":
          let rdp = new informacionNombreEmpleador();
          rdp.nombreEmpleador = $(this).find(`input`).val();
          infoEc.agregarRelacionDependencia(rdp);
          break;
        case "otrasFuentesIngresos":
          let ofi = new informacionOtrosIngresos();
          ofi.otrasFuentesIngreso = $(this).find(`input`).val();
          infoEc.agregarotrosIngresos(ofi);
          break;
      }
    });
  return infoEc;
}
function obtenerDatosProductoServicio(ps) {
  console.log("obteniendo datos de productos y servicios");
  const arrProducto = new Array();
  for (let i = 0; i < ps.length; i++) {
    const id = $(ps[i]).attr("id");
    const idProductoServicio = $(ps[i]).attr("idproductoservicio");
    let producto = new dicProductoServicio(idProductoServicio);
    producto.fecha = $(ps[i]).find(`input#fecha${id}`).val();
    producto.lugar.pais = $(ps[i])
      .find(`select[id=pais${id}] option:selected`)
      .val();
    producto.lugar.departamento = $(ps[i])
      .find(`select[id=depto${id}] option:selected`)
      .val();
    producto.lugar.municipio = $(ps[i])
      .find(`select[id=muni${id}] option:selected`)
      .val();
    producto.identificador = $(ps[i]).find(`input#identificador${id}`).val();
    producto.tipo = $(ps[i]).find(`input#tipo${id}`).val();
    producto.nombre = $(ps[i]).find(`input#nombre${id}`).val();
    producto.descripcion = $(ps[i]).find(`input#descripcion${id}`).val();
    producto.nombreContrata = $(ps[i]).find(`input#nombreContrata${id}`).val();
    producto.moneda = $(ps[i]).find(`select.moneda option:selected`).val();
    producto.valor = $(ps[i]).find(`input#valor${id}`).val();
    const beneficiarios = $(ps[i])
      .find(`div#datosBeneficiario${id}`)
      .children();
    producto.beneficiarios = obtenerDiccionarioCamposMinimos(beneficiarios);
    const otrosFirmantes = $(ps[i])
      .find(`div#datosOtrosFirmantes${id}`)
      .children();
    producto.otrosFirmantes = obtenerDiccionarioCamposMinimos(otrosFirmantes);

    arrProducto.push(producto);
  }
  return arrProducto;
}
function obtenerDatosOtrosIngresos() {
  let otrosIngresos = new Array();
  $("div#datosOtrosIngresos")
    .children()
    .each(function () {
      let doi = new dicPerfilEconomicoOtrosIngresos($(this).attr("idoi"));
      doi.tipoOI = $(this).find("select.tipoOtrosIngresos").val();
      doi.detalleOI = $(this).find("input.DetalleOtrosIngresos").val();
      doi.tipoMoneda = $(this).find("select.moneda ").val();
      doi.montoAproximado = $(this).find("input.montoAproximado ").val();
      otrosIngresos.push(doi);
    });
  return otrosIngresos;
}
function obtenerUbicacionesGeograficas(ubgeo) {
  let UbicacionesGeograficas = new Array();
  $(ubgeo)
    .children()
    .each(function () {
      let lgubg = new dicLugar();
      lgubg.pais = $(this).find(`select.pais option:selected`).val();
      if (lgubg.pais === "1") {
        lgubg.departamento = $(this).find(`select.depto option:selected`).val();
        lgubg.municipio = $(this).find(`select.muni option:selected`).val();
      }
      UbicacionesGeograficas.push(lgubg);
    });
  return UbicacionesGeograficas;
}
function obtenerDatosPerfilTransaccional() {
  let dperfilTransaccional = new Array();
  $("div#datosPerfilTransaccional")
    .children()
    .each(function () {
      let dpt = new dicPerfilTransaccional($(this).attr("iddpet"));
      dpt.fecha = $(this).find("div.date>input.Pspt").val();
      dpt.productoServicio = $(this).find("input.productoServicioPspt").val();
      dpt.tipoMoneda = $(this).find("select.moneda ").val();
      dpt.montoPromedioMensual = $(this).find("input.montoAproximado ").val();
      dpt.pubGeo = obtenerUbicacionesGeograficas(
        $(this).find("div#ubicacionesGeoraficas")
      );
      dperfilTransaccional.push(dpt);
    });
  return dperfilTransaccional;
}
function obtenerDatosPerfilEconomicoTransaccional(pet) {
  console.log(`perfil economico transaccinal`);
  let dpet = null;
  if ($(pet).children().length != 0) {
    const idpet = $(pet).attr("idperfileconomicotransaccional");
    dpet = new dicPerfilEconomicoTransaccional(idpet);
    dpet.actualizacion = $(pet).find("select#actualizacionPet").val();
    dpet.fecha = $(pet).find("input#fechaPet").val();
    // obtener Fuentes de ingresos
    $("#datosNegocioPropio")
      .children()
      .each(function () {
        const iddpenp = $(this).attr(
          "iddiccionarioperfileconomiconegociopropio"
        );
        let ngp = new dicPerfilEconomicoNegocioPropio(iddpenp);
        ngp.nombreComercial = $(this).find(`input.nombreComercial`).val();
        ngp.principalActividadEconomica = $(this)
          .find(`input.principalActividadEconomica`)
          .val();
        ngp.fechaInscripcionNegocio = $(this)
          .find(`input.InscripcionNegocio`)
          .val();
        ngp.numeroRegistro = $(this).find("input.numeroRegistro").val();
        ngp.folio = $(this).find("input.folio").val();
        ngp.libro = $(this).find("input.libro").val();
        ngp.direccionNegocio = $(this).find(`input.direccion`).val();
        ngp.lugar.pais = $(this).find(`select.pais option:selected`).val();
        if (ngp.lugar.pais === "1") {
          ngp.lugar.departamento = $(this)
            .find(`select.depto option:selected`)
            .val();
          ngp.lugar.municipio = $(this)
            .find(`select.muni option:selected`)
            .val();
        }
        ngp.tipoMoneda = $(this).find(`select.moneda option:selected`).val();
        ngp.montoAproximado = $(this).find(`input.montoAproximado`).val();
        dpet.agregarNegocioPropio(ngp);
      });
    // relacion de dependencia
    $("div#datosRelacionDependencia")
      .children()
      .each(function () {
        let drd = new dicPerfilEconomicoRelacionDependencia(
          $(this).attr("idrd")
        );
        drd.sector = $(this).find("select.sector").val();
        drd.nombreEmpleador = $(this).find("input.NombreEmpleador").val();
        drd.priActEcoE = $(this).find("input.prinActiEcoEmple").val();
        drd.puestoDesempenia = $(this).find("input.puestoDesempenia").val();
        drd.direccionEmpleador = $(this).find("input.direccion").val();
        drd.lugar.pais = $(this).find("select.pais").val();
        drd.lugar.departamento = $(this).find("select.depto").val();
        drd.lugar.municipio = $(this).find("select.muni").val();
        drd.tipoMoneda = $(this).find("select.moneda ").val();
        drd.montoAproximado = $(this).find("input.montoAproximado ").val();
        dpet.agregarRelacionDependencia(drd);
      });
    // otros ingresos
    dpet.otrosIngresos = obtenerDatosOtrosIngresos();
    dpet.perfilTransaccional = obtenerDatosPerfilTransaccional();
  }

  return dpet;
}
function obtenerDatos() {
  let df = new diccionarioFormulario(
    $(".diccionarioFormulario").attr("idDiccionario")
  );
  df.titulares = obtenerDiccionarioCamposMinimos($("#titulares>div"));
  const productoServicio = $(`div#datosProductoServicio`).children();
  df.productos = obtenerDatosProductoServicio(productoServicio);

  const pet = $(`div#perfilEconomicoTransaccional`).find("div.card-body");
  df.perfilEconomico = obtenerDatosPerfilEconomicoTransaccional(pet);
  console.log(df);
  return df;
}
function noEnviarFormularioConEnter() {
  $("#diccionarioFormulario").on("keyup keypress", function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      return false;
    }
  });
}
$(document).ready(function () {
  // function askConfirmation(evt) {
  //     var msg =
  //         "Si recarga la página perdera todos los datos ingresados.\n¿Deseas recargar la página?";
  //     evt.returnValue = msg;
  //     return msg;
  // }
  // window.addEventListener("beforeunload", askConfirmation);
  agregarCamposMinimos("Titular", "div#titulares");
  $(".select2").select2();

  //Initialize Select2 Elements
  $(".select2bs4").select2({
    theme: "bootstrap4",
  });
  console.log("Esperando a que la pagina cargue completamente ");
  noEnviarFormularioConEnter();
  setFormatoFecha($(".date"));
  verificaActuaNombrePropio($(".actuaNombrePropio"));
  habilitaDepartamentoMunicipio($(".deshabilitaDepartamentoMunicipio"));
  cargarMunicipios($(".getMunicipio"));
  validarApellidoCasada($(".apellidoCasada"));
  habilitaOtraCondicionMigratoria($(`select.condicionMigratoria`));
  validarNit($(".validarNit"));
  habilitaPaisPasaporte($(".validaPaisPasaporte"));
  agregarTemplateNacionalidad($(".agregarNacionalidad"));
  eliminarTemplateNacionalidad($(`.borrarNacionalidad`));
  agregarTemplateTelefono($(".agregarTelefono"));
  eliminarTemplateTelefono($(`.borrarTelefono`));
  verificarPersonaPep($(".pep"));
  habilitaOtroOrigenriqueza($("select.otroOrigenRiqueza"));
  verificarAsoPep($(".asoPep"));
  habilitaOtroCampoDesdeSelect($("select.parentesco"), 6);
  habilitaOtroCampoDesdeSelect($("select.motivoAsociacion"), 5);
  btnaddfamasopep($(`button.agregarFamiliarAsociado`));
  validarTipoFuenteIngreso($("select.fuenteIngresos"));
  agregarTemplateFuenteIngresos($("button.agregarFuenteIngresos"));
  borrarTemplateFuenteIngresos($(`.borrarFuenteIngreso`));
  AgregarTitular();
  eliminarCard($("#titulares>div"));
  eliminarCard($("#datosProductoServicio>div"));
  eliminarCard($("#perfilEconomicoTransaccional>div"));
  agregarProductoServicio($("button.agregarProductoServicio"));
  btnAgregarBeneficiario($("button.agregarBeneficiario"));
  btnAgregarOtroFirmantes($("button.agregarOtrosFirmantes"));

  agregarPerfilEconomico($("button.agregarPerfilEconomico"));
  agregarPerfilEconomicoNegocioPropio($("button#agregarNegocioPropio"));
  agregarPerfilEconomicoRelacionDependencia(
    $("button#agregarRelacionDependencia")
  );
  agregarTemplateOtrosIngresos("button#agregarOtrosIngresos");
  agregarTemplatePerfilTransaccional("button#agregarPerfilTransaccional");
  agregarPUG($("button.agregarUbicacionGeo"));
  borrarUbicacionGeografica("button.btnUbicacionGeografica");
  validarFormulario();
});
