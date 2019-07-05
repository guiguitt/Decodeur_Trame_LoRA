function readbool(buf,offset){
   offset = offset >>> 0;
   if(buf[offset]==1){
     return true
   }
    else{
     return false
    }
}
function readInt64BE(buf, offset) {
    offset = offset >>> 0;
    val =(buf[offset]<<56) | (buf[offset+1]<<48) | (buf[offset+2]<<40) | (buf[offset+3]<<32) | ( buf[offset+4]<<24) | (buf[offset+5]<<16)  | (buf[offset + 6]<<8) | buf[offset+7];

    if (!(buf[offset] & 0x80)) {
        return val
    }
    return ((~val)+1)*-1;
}
function readInt32BE(buf, offset) {
    offset = offset >>> 0;
    val = (buf[offset]<<24) | (buf[offset+1]<<16)  | (buf[offset + 2]<<8) | buf[offset+3] ;

    if (!(buf[offset] & 0x80)) {
        return val
    }
    return ((~val)+1)*-1;
}

function readInt16BE(buf, offset) {
    offset = offset >>> 0;
    val = (buf[offset]<<8) | buf[offset+1] ;

    if (!(buf[offset] & 0x80)) {
        return val
    }
    return ((~val)+1)*-1;
}

function readInt8BE(buf, offset) {
    offset = offset >>> 0;
    if (!(buf[offset] & 0x80)) {
        return (buf[offset])
    }
    return ((~buf[offset]) + 1) * -1;
}
function readUInt64BE(buf, offset) {
    offset = offset >>> 0;
    return (buf[offset]<<56) | (buf[offset+1]<<48) | (buf[offset+2]<<40) | (buf[offset+3]<<32) | ( buf[offset+4]<<24) | (buf[offset+5]<<16)  | (buf[offset + 6]<<8) | buf[offset+7];
}
function readUInt32BE(buf, offset) {
    offset = offset >>> 0;
    return (buf[offset]<<24) | (buf[offset+1]<<16)  | (buf[offset + 2]<<8) | buf[offset+3] ;
}
function readUInt16BE(buf, offset) {
    offset = offset >>> 0;
    return (buf[offset] << 8) | buf[offset + 1]
}

function readUInt8(buf, offset) {
    offset = offset >>> 0
    return (buf[offset])
}

Elsys_Payload = {

    'decodeUp': function (port, payload) {

        var TYPE_TEMPERATURE = 0x01;
        var TYPE_LONGITUDE=0x02;
        var TYPE_LATITUDE=0x03;
        var TYPE_HAUTEUR=0x05;
        var TYPE_DEBIT=0x06;
        var TYPE_DETECT=0x07
        
        // TBC

        var value = {}
        var idx = 0;
        var v;
        while (idx < payload.length) {
            dataType = payload[idx++];
            // console.log(idx, "-->", dataType);
            switch (dataType) {

                case TYPE_TEMPERATURE:
                      v = readInt16BE(payload, idx) / 10.0;
                      idx += 2;
                      value["temperature"] = v;
                      break;
                case TYPE_LONGITUDE:
                      v = readInt32BE(payload, idx) / 100000.0;
                      idx += 4;
                      value["longitude"]= v;
                      break;
                case TYPE_LATITUDE:
                      v = readInt32BE(payload, idx) / 100000.0;
                      idx += 4;
                      value["latitude"] = v;
                      break;
                case TYPE_HAUTEUR:
                      v = readUInt16BE(payload, idx) / 10.0;
                      idx += 2;
                      value["temperature"] = v;
                      break;
                case TYPE_DEBIT:
                      v = readUInt16BE(payload, idx) / 10.0;
                      idx += 2;
                      value["temperature"] = v;
                      break;
                case TYPE_DETECT:
                      v = readUInt8(payload, idx);
                      idx += 1;
                      value["detection"] = v;
                      break;
                default:
            }
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