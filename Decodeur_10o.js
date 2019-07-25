function readbool(buf,offset){
   offset = offset;
   if(buf[offset]==1){
     return 0
   }
    else{
     return 1
    }
}
function readInt64BE(buf, offset) {
    offset = offset;
    val =(buf[offset]<<56) | (buf[offset+1]<<48) | (buf[offset+2]<<40) | (buf[offset+3]<<32) | ( buf[offset+4]<<24) | (buf[offset+5]<<16)  | (buf[offset + 6]<<8) | buf[offset+7];

    if (!(buf[offset] & 0x80)) {
        return val
    }
    return ((~val)+1)*-1;
}
function readInt32BE(buf, offset) {
    offset = offset;
    val = (buf[offset]<<24) | (buf[offset+1]<<16)  | (buf[offset + 2]<<8) | buf[offset+3] ;

    if (!(buf[offset] & 0x80)) {
        return val
    }
    return ((~val)+1)*-1;
}

function readInt16BE(buf, offset) {
    offset = offset;
    val = (buf[offset]<<8) | buf[offset+1] ;

    if (!(buf[offset] & 0x80)) {
        return val
    }
    return ((~val)+1)*-1;
}

function readInt8BE(buf, offset) {
    offset = offset;
    if (!(buf[offset] & 0x80)) {
        return (buf[offset])
    }
    return ((~buf[offset]) + 1) * -1;
}
function readUInt64BE(buf, offset) {
    offset = offset;
    return (buf[offset]<<56) | (buf[offset+1]<<48) | (buf[offset+2]<<40) | (buf[offset+3]<<32) | ( buf[offset+4]<<24) | (buf[offset+5]<<16)  | (buf[offset + 6]<<8) | buf[offset+7];
}
function readUInt32BE(buf, offset) {
    offset = offset;
    return (buf[offset]<<24) | (buf[offset+1]<<16)  | (buf[offset + 2]<<8) | buf[offset+3] ;
}
function readUInt16BE(buf, offset) {
    offset = offset;
    return (buf[offset] << 8) | buf[offset + 1]
}

function readUInt8(buf, offset) {
    offset = offset;
    return (buf[offset])
}
function readUInt4H(buf, offset) {
    offset = offset;
    return (buf[offset]>>4)
}
function readUInt4L(buf, offset) {
    offset = offset;
    return (buf[offset] && ~(0xF<<4))
}
function readUInt2H(buf, offset) {
    offset = offset;
    return (buf[offset]>>6)
}
function readUInt6L(buf, offset) {
    offset = offset;
    return (buf[offset] & ~(0x3<<6))
}


Elsys_Payload = {

    'decodeUp': function (port, payload) {
        var value = {}
        var idx = 0;
        var v;
        v = readUInt2H(payload, idx);
        value["detection"] = v;
        v = readUInt6L(payload, idx);
        value["batterie"] = v*0.2;
        if(payload.length>1){
                idx += 1;
                v = readInt32BE(payload, idx) / 100000.0;
                idx += 4;
                value["longitude"]= v;
                v = readInt32BE(payload, idx) /  100000.0;
                idx += 4;
                value["latitude"] = v;
        }
        return value;
    },


    'encodeDn': function (port, value) {
        // TO BE IMPLEMENTED
        return null;
    }
}




function Decoder(fPort, bytes) {
  
    return Elsys_Payload.decodeUp(bytes, fPort)
}