// Learn more about F# at http://fsharp.org
// See the 'F# Tutorial' project for more help.


module DynamoDb =
    open Amazon.DynamoDBv2
    open Amazon.DynamoDBv2.DocumentModel
    open Amazon.DynamoDBv2.Model
    open Amazon.Runtime

    let temp = 1
    let awsAccessKey = "AKIAIKBBH76QPNGGD25Q"
    let awsSecretKey = "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"

    let bclList (lst:'a list) = new System.Collections.Generic.List<'a>(lst)
    let attr = ScalarAttributeType
    let keyType = KeyType

    //let credentials = new EnvironmentVariablesAWSCredentials()
    let client = new AmazonDynamoDBClient(awsAccessKey, awsSecretKey, Amazon.RegionEndpoint.USWest1)

    let waitForStatus tableName status = 
        let rec loop attempt maxretry delay (prevStatus:TableStatus option) = async {
            if attempt > maxretry then
                return prevStatus
            else
                do! Async.Sleep delay
                let res = client.DescribeTable(DescribeTableRequest(TableName = tableName))
                let currStatus = res.Table.TableStatus
                if res.Table.TableStatus = status then
                    return Some res.Table.TableStatus
                else
                    return! loop (attempt + 1) maxretry delay (Some currStatus)
        }
        loop 0 200 50 None
    
    let createTable tableName = 
        client.CreateTableAsync(
            CreateTableRequest(TableName = tableName,
                               KeySchema = bclList [
                                    KeySchemaElement(AttributeName="H", KeyType= keyType "HASH")
                                    KeySchemaElement(AttributeName="K", KeyType= keyType "RANGE")],
                               AttributeDefinitions = bclList [
                                    AttributeDefinition(AttributeName="H", AttributeType = attr "N")
                                    AttributeDefinition(AttributeName="K", AttributeType = attr "N")],
                               ProvisionedThroughput = 
                                    ProvisionedThroughput(ReadCapacityUnits= int64 5, WriteCapacityUnits = int64 5)))
        |> Async.AwaitTask
//
//            return! Async.AwaitTask res
//            if res.HttpStatusCode = System.Net.HttpStatusCode.OK then
//                return! waitForStatus tableName TableStatus.ACTIVE
//            else
//                return None
//        with
//        | :? ResourceInUseException -> 
//            printfn "Table already exists."
//            return None
//        | _ -> 
//            return None
//    }
             
    let deleteTable tableName = 
        client.DeleteTableAsync(DeleteTableRequest(tableName))
        |> Async.AwaitTask
               

open Amazon.DynamoDBv2
open Amazon.DynamoDBv2.DocumentModel
open Amazon.DynamoDBv2.Model
open Amazon.Runtime
open DynamoDb

[<EntryPoint>]
let main argv = 
    let tableName = "tracy-test"
    async {
        printfn "Creating table, %s..." tableName
        let! res = DynamoDb.createTable tableName
        let! status = DynamoDb.waitForStatus tableName TableStatus.ACTIVE
        printfn "Table created!"

        let t = Table.LoadTable(DynamoDb.client, tableName)

        let save (table:Table) id version body = 
            table.PutItem(dict [
                "H", id
                "K", version
                "V", body
            ])

        let _ =    
            [0..10]
            |> List.map (fun version -> save t 0 version (sprintf "version %d" version)

        do! Asyncleep 2000

        printfn "Deleting table, %s..." tableName
        let! del = DynamoDb.deleteTable tableName
        //let! status = DynamoDb.waitForStatus tableName TableStatus.
        
        printfn "Table deleted!"
    } |> Async.RunSynchronously

    0 // return an integer exit code
