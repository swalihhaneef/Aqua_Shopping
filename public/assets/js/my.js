
///////////////////product validation/////////////////////////
var pnameError = document.getElementById('nameError')
var ppriceError = document.getElementById('priceError')
var pqtyError = document.getElementById('quantityError')
var pmaterialError = document.getElementById('materialError')
var pdiscpriptionError = document.getElementById('discriptonError')
var pimageError = document.getElementById('imageError')
var pcategoryError = document.getElementById('categoryError')
var psubmitError = document.getElementById('psubmit')
var img_ext = ['jpeg',"png","jpg"] 
function validatepName(){
    var pname =document.getElementById("pname").value
    if(pname.length == 0){
        pnameError.innerHTML = 'please fill the field'
        return false
    }
    pnameError.innerHTML = 'okk'
    return true
}
function validatepprice(){
    var pprice =document.getElementById("pprice").value
    if(pprice.length == 0){
        ppriceError.innerHTML = 'please fill the field'
        return false
    }else if(pprice <0 || pprice > 50000){
        ppriceError.innerHTML = 'not allowed'
        return false
    }
     ppriceError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepqty(){
    var pqty =document.getElementById("pqty").value
    if(pqty.length == 0){
        pqtyError.innerHTML = 'please fill the field'
        return false
    }else if(pqty < 0 ||  pqty > 1000){
        pqtyError.innerHTML = 'cant add the quatinty'
        return false
    }
    pqtyError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepmaterial(){
    var pmaterial =document.getElementById("pmaterial").value
    if(pmaterial.length == 0){
        pmaterialError.innerHTML = 'please fill the field'
        return false
    }pmaterialError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepdiscrptn(){
    var pdiscription =document.getElementById("pdiscription").value
    if(pdiscription.length == 0){
        pdiscpriptionError.innerHTML = 'please fill the field'
        return false
    }pdiscpriptionError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepimage(){
    var pimage =document.getElementById("pimage").value
    
    if(pimage.length == ""){
        pimageError.innerHTML = 'please fill the field'
        return false
    } 
    pimageError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepcatgry(){
    var pcategory =document.getElementById("pcategory").value
    if(pcategory.length == 0){
        pcategoryError.innerHTML = 'please fill the field'
        return false
    }
    pcategoryError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepform(){
    if(!validatepName() || !validatepprice() || !validatepqty() || !validatepmaterial() || !validatepdiscrptn() || !validatepimage() || !validatepcatgry()){
        psubmitError.innerHTML = 'fix the issues'
        return false
    }

}
////////////////////////////////////////////EDIT PRODUCT/////////////////////////////
var editproductnameError =document.getElementById('editproductnameError')
var editproductpriceError =document.getElementById('editproductpriceError')
var editproductqtyError =document.getElementById('editproductqtyError')
var editproductmaterialError =document.getElementById('editproductmaterialError')
var editproductdiscriptionError =document.getElementById('editproductdiscriptionError')
var categoryError =document.getElementById('categoryError')

function editproductname(){
    var pename = document.getElementById('editproductname').value
    if(pename.length == 0){
        editproductnameError.innerHTML = 'this field should not keep empty'
        return false
    }editproductnameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function editproductprice(){
    var pename = document.getElementById('editproductprice').value
    if(pename.length == 0){
        editproductpriceError.innerHTML = 'this field should not keep empty'
        return false
    }else if(pename <0){
        editproductpriceError.innerHTML = 'cant accept the negative price'
        return false
    }
    editproductpriceError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function editproductqty(){
    var pename = document.getElementById('editproductqty').value
    if(pename.length == 0){
        editproductqtyError.innerHTML = 'this field should not keep empty'
        return false
    }else if(pename <0){
        editproductqtyError.innerHTML = 'this field should not keep empty'
        .innerHTML = 'cant accept the negative price'
        return false
    }editproductqtyError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function editproductmaterial(){
    var pename = document.getElementById('editproductmaterial').value
    if(pename.length == 0){
        editproductmaterialError.innerHTML = 'this field should not keep empty'
        return false
    }editproductmaterialError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function editproductdiscrption(){
    var pename = document.getElementById('editproductdiscrption').value
    if(pename.length == 0){
        editproductdiscriptionError.innerHTML = 'this field should not keep empty'
        return false
    }editproductdiscriptionError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function editproductcategory(){
    var pename = document.getElementById('editproductcategory').value
    if(pename.length == 0){
        categoryError.innerHTML = 'this field should not keep empty'
        return false
    }categoryError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validatepeditform(){
    if(!editproductname()||!editproductprice()||!editproductqty()||!editproductmaterial()||!editproductdiscrption()||!editproductcategory()){
        return false
    }return true
}
/////////////////////////////////////////banner//////////////////////////////////////

var headerError = document.getElementById('bheaderError');
var btextdownError = document.getElementById('btextdownError');
var bannerimageError = document.getElementById('bannerimageError');

function bheaderError() {
  var bheader = document.getElementById("bheader").value;
  if (bheader.length == 0) {
    headerError.innerHTML = 'please fill the field';
    return false;
  }
  headerError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>';
  return true;
}

function btextDown() {
  var bannertextdown = document.getElementById("btextDown").value;
  if (bannertextdown.length == 0) {
    btextdownError.innerHTML = 'please fill the field';
    return false;
  }
  btextdownError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>';
  return true;
}

function bimageError() {
    var bimage = document.getElementsByName("image")[0].value;
    if (bimage.trim().length == 0) {
      bannerimageError.innerHTML = 'please fill the field';
      return false;
    }
    bannerimageError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>';
    return true;
  }
  

  function bannerFormSubmission() {
    var bannersubmit = document.getElementById("bannersubmitError");
    if (!bheaderError() || !btextDown() || !bimageError()) {
      bannersubmit.innerHTML = 'fix the issues';
      return false;
    }
    return true;
  }
////////////////////////////////////banner edit//////////////////////////////////////////////////////////////

var headerError = document.getElementById('bheaderError');
var btextdownError = document.getElementById('btextdownError');
var bannerimageError = document.getElementById('bannerimageError');

function bheaderError() {
  var bheader = document.getElementById("bheader").value;
  if (bheader.length == 0) {
    headerError.innerHTML = 'please fill the field';
    return false;
  }
  headerError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>';
  return true;
}

function btextDown() {
  var bannertextdown = document.getElementById("btextDown").value;
  if (bannertextdown.length == 0) {
    btextdownError.innerHTML = 'please fill the field';
    return false;
  }
  btextdownError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>';
  return true;
}

function bimageError() {
    var bimage = document.getElementsByName("image")[0].value;
    if (bimage.trim().length == 0) {
      bannerimageError.innerHTML = 'please fill the field';
      return false;
    }
    bannerimageError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>';
    return true;
  }
  

  function bannerFormSubmission() {
    var bannersubmit = document.getElementById("bannersubmitError");
    if (!bheaderError() || !btextDown() || !bimageError()) {
      bannersubmit.innerHTML = 'fix the issues';
      return false;
    }
    return true;
  }
////////////////////////////////////////////category/////////////////////////////////////////////////////
var cnameError = document.getElementById('category-error')
var submitError = document.getElementById('submit')
function validateName(){
    var name = document.getElementById('name').value;
    if(name.length==0){
        cnameError.innerHTML ='name is required'
        return false;
    }
    cnameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function validateForm(){
    if(!validateName()){
        submitError.style.display = 'block'
        submitError.innerHTML ='fill the above field'
        setTimeout(function(){submitError.style.display = 'none'},3000)
         return false
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////user add address/////////////////////////////////////////////////////
var fnameError = document.getElementById('fnameError')
var lnameError = document.getElementById('lnameError')
var emailError = document.getElementById('emailError')
var houseError = document.getElementById('houseError')
var LandMarkError = document.getElementById('LandMarkError')
var townError = document.getElementById('townError')
var stateError = document.getElementById('stateError')
var pinCodeError = document.getElementById('pinCodeError')
var mobileError = document.getElementById('mobileError')

function firstName(){
    var fname = document.getElementById('firstName').value
    if(fname.length == 0){
        fnameError.innerHTML = 'this field should not be empty'
        return false
    }fnameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function lastName(){
    var lname = document.getElementById('lastName').value
    if(lname.length == 0){
        lnameError.innerHTML = 'this field should not be empty'
        return false
    }lnameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function email(){
    var fname = document.getElementById('email').value
    if(fname.length == 0){
        emailError.innerHTML = 'this field should not be empty'
        return false
    }emailError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function address(){
    var fname = document.getElementById('address').value
    if(fname.length == 0){
        houseError.innerHTML = 'this field should not be empty'
        return false
    }houseError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function landmark(){
    var fname = document.getElementById('landmark').value
    if(fname.length == 0){
        LandMarkError.innerHTML = 'this field should not be empty'
        return false
    }LandMarkError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function town(){
    var fname = document.getElementById('town').value
    if(fname.length == 0){
        townError.innerHTML = 'this field should not be empty'
        return false
    }townError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function state(){
    var fname = document.getElementById('state').value
    if(fname.length == 0){
        stateError.innerHTML = 'this field should not be empty'
        return false
    }stateError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function pinCode(){
    var fname = document.getElementById('pinCode').value
    if(fname.length == 0){
        pinCodeError.innerHTML = 'this field should not be empty'
        return false
    }pinCodeError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}function phone(){
    var fname = document.getElementById('phone').value
    if(fname.length == 0){
        mobileError.innerHTML = 'this field should not be empty'
        return false
    }else if(fname.length<10){
        mobileError.innerHTML = 'number should not be less 10 characters'
        return false
    }else if(fname.length>10){
        mobileError.innerHTML = 'number should not exceeded 10 characters'
        return false
    }
    mobileError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}function addAddress(){
    
    if(!firstName()||!lastName()||!email()||!address()||!landmark()||!town()||!state()||!pinCode()||!phone()){
      
        return false
    }
    return true
}
//////////////////////////////////////edit address////////////////////////////////////////////////////////////////////
var EfnameError = document.getElementById('EfnameError')
var ElnameError = document.getElementById('ElnameError')
var EemailError = document.getElementById('EemailError')
var EhouseError = document.getElementById('EhouseError')
var ELandMarkError = document.getElementById('ELandMarkError')
var EtownError = document.getElementById('EtownError')
var EstateError = document.getElementById('EstateError')
var EpinCodeError = document.getElementById('EpinCodeError')
var EmobileError = document.getElementById('EmobileError')

function EfirstName(){
    var fname = document.getElementById('EfirstName').value
    if(fname.length == 0){
        EfnameError.innerHTML = 'this field should not be empty'
        return false
    }EfnameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function ElastName(){
    var lname = document.getElementById('ElastName').value
    if(lname.length == 0){
        ElnameError.innerHTML = 'this field should not be empty'
        return false
    }ElnameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function Eemail(){
    var fname = document.getElementById('Eemail').value
    if(fname.length == 0){
        EemailError.innerHTML = 'this field should not be empty'
        return false
    }EemailError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function Eaddress(){
    var fname = document.getElementById('Eaddress').value
    if(fname.length == 0){
        EhouseError.innerHTML = 'this field should not be empty'
        return false
    }EhouseError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function Elandmark(){
    var fname = document.getElementById('Elandmark').value
    if(fname.length == 0){
        ELandMarkError.innerHTML = 'this field should not be empty'
        return false
    }ELandMarkError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function Etown(){
    var fname = document.getElementById('Etown').value
    if(fname.length == 0){
        EtownError.innerHTML = 'this field should not be empty'
        return false
    }EtownError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function Estate(){
    var fname = document.getElementById('Estate').value
    if(fname.length == 0){
        EstateError.innerHTML = 'this field should not be empty'
        return false
    }EstateError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function EpinCode(){
    var fname = document.getElementById('EpinCode').value
    if(fname.length == 0){
        EpinCodeError.innerHTML = 'this field should not be empty'
        return false
    }EpinCodeError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}function Ephone(){
    var fname = document.getElementById('Ephone').value
    if(fname.length == 0){
        EmobileError.innerHTML = 'this field should not be empty'
        return false
    }else if(fname.length<10){
        EmobileError.innerHTML = 'number should not be less 10 characters'
        return false
    }else if(fname.length>10){
        EmobileError.innerHTML = 'number should not exceeded 10 characters'
        return false
    }
    EmobileError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}function editAddress(){
    
    if(!EfirstName()||!ElastName()||!Eemail()||!Eaddress()||!Elandmark()||!Etown()||!Estate()||!EpinCode()||!Ephone()){
      
        return false
    }
    return true
}
/////////////////////////////////////////////coupon////////////////////////////////////////////
var couponNameError = document.getElementById('couponNameError')
var couponexpDateError = document.getElementById('couponexpDateError')
var couponQtyError = document.getElementById('couponQtyError')
var couponMinspendError = document.getElementById('couponMinspendError')
var couponMaxSpendError = document.getElementById('couponMaxSpendError')
var couponMindisError = document.getElementById('couponMindisError')
var couponMaxdisError = document.getElementById('couponMaxdisError')


function couponName(){
    var couponName = document.getElementById('couponName').value
    if(couponName.length==0){
        couponNameError.innerHTML = 'please fill this field'
        return false
    }couponNameError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function expiryDate(){
    var couponName = document.getElementById('expiryDate').value
    if(couponName.length==0){
        couponexpDateError.innerHTML = 'please fill this field'
        return false
    }couponexpDateError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function couponquantity(){
    var couponName = document.getElementById('couponquantity').value
    if(couponName.length==0){
        couponQtyError.innerHTML = 'please fill this field'
        return false
    }couponQtyError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function minAmount(){
    var couponName = document.getElementById('minAmount').value
    if(couponName.length==0){
        couponMinspendError.innerHTML = 'please fill this field'
        return false
    }couponMinspendError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function maxAmount(){
    var couponName = document.getElementById('maxAmount').value
    if(couponName.length==0){
        couponMaxSpendError.innerHTML = 'please fill this field'
        return false
    }couponMaxSpendError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function minDiscount(){
    var couponName = document.getElementById('minDiscount').value
    if(couponName.length==0){
        couponMindisError.innerHTML = 'please fill this field'
        return false
    }couponMindisError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function maxDiscount(){
    var couponName = document.getElementById('maxDiscount').value
    if(couponName.length==0){
        couponMaxdisError.innerHTML = 'please fill this field'
        return false
    }couponMaxdisError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><mask id="ipSCorrect0"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z" clip-rule="evenodd"/></mask><path fill="lime" d="M0 0h48v48H0z" mask="url(#ipSCorrect0)"/></svg>'
    return true
}
function coupounSumit(){
   
    if(!couponName||!expiryDate||!couponquantity||!minAmount||!maxAmount||!minDiscount||!maxDiscount){
       
        return false
    }
    return true
}
