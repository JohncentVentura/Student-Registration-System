Imports System.Data.OleDb
Imports System.Reflection.Emit
Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class Form3
    Dim connectionstring As String
    Dim dbconnection As OleDbConnection
    Dim dbadapter As New OleDbDataAdapter
    Dim dbdataset As New DataSet

    Private Sub Form3_FormClosed(sender As Object, e As FormClosedEventArgs) Handles MyBase.FormClosed
        MainForm.Enabled() = True
        MainForm.Show()
        Me.Hide()
    End Sub
    Private Sub Form3_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Me.Text = "Course Registration"
        DisplayNorm()
        DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
    End Sub

    Private Sub DisplayNorm()
        Label1.Text = "Course Code"
        Label2.Text = "Description"
        Label3.Text = "Units"
        Button1.Text = "Add"
        Button2.Text = "Edit"
        Button3.Text = "Delete"
        Button1.Enabled = True
        Button2.Enabled = True
        Button3.Enabled = True
        TextBox1.Enabled = False
        TextBox2.Enabled = False
        TextBox1.Text = vbNullString
        TextBox2.Text = vbNullString
        Button1.Enabled = True
        Button2.Enabled = True
        Button3.Enabled = True
        DataGridView1.AllowUserToAddRows = False

        connectionstring = "Provider = Microsoft.Jet.OLEDB.4.0; Data Source = student.mdb;"
        dbconnection = New OleDbConnection(connectionstring)
        Try
            dbconnection.Open()
            dbdataset.Clear()
            dbadapter = New OleDbDataAdapter("Select * from Course", connectionstring)
            dbadapter.Fill(dbdataset, "Course")
            DataGridView1.DataSource = dbdataset.Tables("Course").DefaultView
            dbconnection.Close()
            Label3.Text = "Connected"
            Label3.ForeColor = Color.LimeGreen
        Catch ex As Exception
            Label3.Text = "Disconnected"
            Label3.ForeColor = Color.Red
        End Try
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Button1.Text = "Add" Then
            Button1.Enabled = False
            Button2.Text = "Save"
            Button3.Text = "Cancel"
            TextBox1.Text = vbNullString
            TextBox2.Text = vbNullString
            TextBox1.Enabled = True
            TextBox2.Enabled = True
            DataGridView1.AllowUserToAddRows = True
        ElseIf Button1.Text = "Save" Then  
            dbconnection.Open()
            Dim dbcommand As New OleDbCommand("UPDATE Course SET TITLE = '" & TextBox2.Text.Trim & "' 
                WHERE COURSE_CODE = '" & TextBox1.Text.Trim & "' ", dbconnection)
            dbcommand.ExecuteNonQuery()
            dbcommand.Dispose() 
            dbconnection.Close() 
            DisplayNorm()
            MsgBox("Record Save", vbInformation, "Update")
        End If
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        If Button2.Text = "Edit" Then
            Button2.Enabled = False
            Button1.Text = "Save"
            Button3.Text = "Cancel"
            TextBox1.Enabled = True
            TextBox2. Enabled = True
        ElseIf Button2.Text = "Save" Then
            If (TextBox1.Text <> vbNullString And TextBox2.Text <> vbNullString)
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("INSERT INTO Course (COURSE_CODE, TITLE) 
                    VALUES ('" + TextBox1.Text.Trim + "','"+ TextBox2.Text.Trim + "')", dbconnection)
                dbcommand.ExecuteNonQuery() 
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Successful", vbInformation, "Add Record") 
            ElseIf (TextBox1.Text = vbNullString) Then
                MsgBox("Enter Course_Code", vbCritical, "Missing")
            ElseIf (TextBox2.Text = vbNullString) Then
                MsgBox("Enter Title", vbCritical, "Missing")
            End If
        ElseIf Button2.Text = "Cancel" Then
            DisplayNorm()
        End If
    End Sub
    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If Button3.Text = "Delete" Then
            Button1.Enabled = False
            Button2.Enabled = False
            Button3.Enabled = False
            Dim Response = MsgBox("Are you sure to delete the record?", vbYesNo, "Confirmation")
            If Response = vbYes Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("DELETE FROM Course WHERE COURSE_CODE = '" & TextBox1.Text.Trim & "' ", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Record was permanently deleted", vbInformation, "Successful")
            Else
                DisplayNorm()
            End If
        Else
            DisplayNorm()
        End If
    End Sub

    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        TextBox1.Text = DataGridView1.CurrentRow.Cells(0).Value
        TextBox2.Text = DataGridView1.CurrentRow.Cells(1).Value
    End Sub

End Class